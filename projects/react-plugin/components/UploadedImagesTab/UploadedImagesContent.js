import React, { Component } from 'react';
import {
  Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img, ImageDescription, ImageName, EditIcon,
  EditIconWrapper
} from '../../styledComponents/index';
import { connect } from 'react-redux';
import { modalClose } from '../../actions';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service'


class UploadedImagesContent extends Component {
  constructor() {
    super();

    this.state = {
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 },
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
  getImageGridWrapperHeight = () => this.imageGridWrapperRef.current.getBoundingClientRect().height + 20;

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
    this.props.onModalClose();
  }

  onEditImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.uploaderConfig.tagging.active) {
      const files = [{...item, public_link: item.url_permalink }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'TAGGING', 'UPLOADED_IMAGES');
    }
  }

  render() {
    const { files, onDragEvent, isDragOver } = this.props;
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
            imageGridWrapperWidth={imageGridWrapperWidth}
            imageContainerHeight={imageContainerHeight}
            columnWidth={columnWidth}
            gutterSize={gutterSize}
            count={imagesList.length}
            list={imagesList}
            upload={this.upload}
            onShowMoreImages={this.onShowMoreImages}
            cellContent={(props) =>
              props.item.id !== 'uploaderBox' ? this.renderImage(props) : this.renderUploadBox(props)
            }
          /> : this.renderUploadBox({})}
      </Content>
    )
  }

  renderImage = ({ style, columnWidth, item, index }) => {
    const isEditImage = this.props.uploaderConfig.tagging.active;

    return (
      <ImageWrapper
        style={{ ...style, width: columnWidth }}
        onClick={() => { this.upload(item); }}
        role="button"
        tabIndex={index}
        onKeyDown={(event) => { this.onKeyDown(event, item); }}
      >
        <div style={{ overflow: 'hidden' }}>
          <Img
            src={ImageGridService.getFitResizeImageUrl(item.url_permalink, columnWidth, columnWidth / (item.ratio || 1.6))}
            height={columnWidth / (item.ratio || 1.6)}
          />
        </div>
        <ImageDescription>
          <ImageName>{item.name}</ImageName>
          {isEditImage &&
          <EditIconWrapper onClick={(event) => { this.onEditImage(event, item); }}><EditIcon/></EditIconWrapper>}
        </ImageDescription>
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
        height={(columnWidth / (item.ratio || 1.6)) + 20}
      >
        <UploadBox isDragOver={isDragOver}>
          <UploadBoxIcon className={'sfi-airstore-image'}/>
          <Label>Drag images here</Label>
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