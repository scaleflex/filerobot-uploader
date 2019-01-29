import React, { Component } from 'react';
import {
  Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img, ImageDescription, ImageName, EditIcon,
  EditIconWrapper, ShowMoreResultsSpinner, TagIconWrapper, Overlay, EditLabel, SelectIconWrapper, SelectIcon
} from '../../styledComponents';
import { connect } from 'react-redux';
import { modalClose } from '../../actions';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';
import { I18n } from 'react-i18nify';


class UploadedImagesContent extends Component {
  constructor() {
    super();

    this.state = {
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 }
    };
    this.imageGridWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.updateImageGridColumnWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  getImageGridWrapperWidth = () => Math.floor(this.imageGridWrapperRef.current.getBoundingClientRect().width);
  getImageGridWrapperHeight = () => this.imageGridWrapperRef.current.getBoundingClientRect().height;

  updateImageGridColumnWidth = () => {
    let { imageGrid } = this.state;
    const { minColumnWidth, gutterSize } = imageGrid;
    const imageGridWrapperWidth = this.getImageGridWrapperWidth();
    const imageContainerHeight = this.getImageGridWrapperHeight();

    imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

    this.setState({ imageGridWrapperWidth, imageGrid, imageContainerHeight });
  };

  onKeyDown = (event, item) => {
    if (event !== 13) return;
    event.stopPropagation();
    this.upload(item);
  }

  upload = (item) => {
    const files = [{...item, public_link: item.url_permalink }];

    this.props.uploaderConfig.uploadHandler(files);

    if (this.props.onClose) this.props.onClose();

    this.props.onModalClose();
  }

  onTagImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.uploaderConfig.tagging.active) {
      const files = [{...item, public_link: item.url_permalink }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY');
    }
  }

  onEditImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.uploaderConfig.imageEditor.active) {
      const { path } = this.props;
      const files = [{...item, public_link: item.url_permalink }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path });
    }
  }

  render() {
    const { files, onDragEvent, isDragOver, isShowMoreImages, imagesIndex, isLoading } = this.props;
    const { imageGrid, imageContainerHeight, imageGridWrapperWidth } = this.state;
    const { columnWidth, gutterSize } = imageGrid;
    const imagesList = [{ id: 'uploaderBox' }, ...files];

    return (
      <Content
        innerRef={this.imageGridWrapperRef}
        onDragOver={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragEnter={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragLeave={(event) => { onDragEvent(event, 'isDragOver', false); }}
        onDragEnd={(event) => { onDragEvent(event, 'isDragOver', false); }}
        isDragOver={isDragOver}
      >
        {files.length ?
          <VirtualizedImagesGrid
            key={imagesIndex}
            imageGridWrapperWidth={imageGridWrapperWidth}
            imageContainerHeight={imageContainerHeight}
            columnWidth={columnWidth}
            gutterSize={gutterSize}
            count={imagesList.length}
            list={imagesList}
            upload={this.upload}
            onShowMoreImages={this.props.onShowMoreImages}
            isShowMoreImages={isShowMoreImages}
            cellContent={(props) =>
              props.item.id !== 'uploaderBox' ? this.renderImage(props) : this.renderUploadBox(props)
            }
          /> : ''}

        {!files.length && !isLoading && this.renderUploadBox({})}

        <ShowMoreResultsSpinner show={isShowMoreImages && imagesList.length > 1}/>
      </Content>
    )
  }

  renderImage = ({ style, columnWidth, item, index }) => {
    const isTagImage = this.props.uploaderConfig.tagging.active;
    const isEditImage = this.props.uploaderConfig.imageEditor.active;

    return (
      <ImageWrapper
        style={{ ...style, width: Math.floor(columnWidth) }}
        role="button"
        tabIndex={index}
        onKeyDown={(event) => { this.onKeyDown(event, item); }}
      >
        <div style={{ overflow: 'hidden' }}>
          <Img
            src={ImageGridService.getFitResizeImageUrl(item.url_permalink, columnWidth, Math.floor(columnWidth / (item.ratio || 1.6)))}
            height={Math.floor(columnWidth / (item.ratio || 1.6))}
          />
        </div>
        <ImageDescription>
          <ImageName>{item.name}</ImageName>
        </ImageDescription>

        {isEditImage &&
        <EditIconWrapper onClick={(event) => { this.onEditImage(event, item); }}>
          <EditIcon/>
          <EditLabel>Edit image</EditLabel>
        </EditIconWrapper>}
        {isTagImage &&
        <TagIconWrapper onClick={(event) => { this.onTagImage(event, item); }}>
          <EditIcon/>
          <EditLabel>Edit info</EditLabel>
        </TagIconWrapper>}
        <SelectIconWrapper onClick={() => { this.upload(item); }}>
          <SelectIcon/>
          <EditLabel>Select</EditLabel>
        </SelectIconWrapper>

        <Overlay/>
      </ImageWrapper>
    );
  }

  renderUploadBox = ({ style = {}, columnWidth = 300, item = {} }) => {
    const { fileDropHandler } = this.props;
    const { isDragOver } = this.state;

    return (
      <UploadBoxWrapper
        onDrop={fileDropHandler}
        method={'post'}
        encType="multipart/form-data"
        style={style}
        columnWidth={columnWidth}
        height={Math.floor((columnWidth / (item.ratio || 1.6)) + 24)}
      >
        <UploadBox isDragOver={isDragOver}>
          <UploadBoxIcon className={'sfi-airstore-image'}/>
          <Label center>{I18n.t('file_manager.drag_images_here')}</Label>
        </UploadBox>
      </UploadBoxWrapper>
    )
  }
}

export default connect(
  ({ uploader: { uploaderConfig } }) => ({ uploaderConfig }),
  dispatch => ({
    onModalClose: () => dispatch(modalClose())
  })
)(UploadedImagesContent);