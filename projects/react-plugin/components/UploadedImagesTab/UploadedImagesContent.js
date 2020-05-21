import React, { Component } from 'react';
import {
  Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img, ImageDescription, ImageName,
  ShowMoreResultsSpinner, Overlay, SelectButton, EditButton, Controls, ControlWrapper, Control, Icon
} from '../../styledComponents';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import { getActualColumnWidth, getFitResizeImageUrl } from '../../services/imageGrid.service';
import { getFileIconSrcByType, isImage } from '../../utils/icons.utils';
import { I18n } from 'react-i18nify';
import { encodePermalink } from '../../utils';
import { getPermalink } from '../../utils/adjustAPI.utils'
import { deleteImage } from '../../services/api.service';


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

    imageGrid.columnWidth = getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

    this.setState({ imageGridWrapperWidth, imageGrid, imageContainerHeight });
  };

  onKeyDown = (event, item) => {
    if (event !== 13) return;
    event.stopPropagation();
    this.select(item);
  }

  select = (item) => {
    const isForceUpload = this.props.appState.config.uploadParams.opt_force_name;

    if (isForceUpload) {
      this.props.upload(true, getPermalink(item));
    } else {
      const files = [{...item, public_link: getPermalink(item) }];
      this.props.appState.config.uploadHandler(files, { stage: 'select' });
      this.props.closeModal();
    }
  }

  onTagImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.tagging.active) {
      const files = [{...item, public_link: getPermalink(item) }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY');
    }
  }

  onEditImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.imageEditor.active) {
      const { path } = this.props;
      const files = [{...item, public_link: getPermalink(item) }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path });
    }
  }

  onDeleteImage = (event, item) => {
    const { forceUpdate, appState } = this.props;
    const { container, uploadKey, baseAPI, platform } = appState.config;
    event.preventDefault();
    event.stopPropagation();

    deleteImage({ item, container, uploadKey, baseAPI, platform })
      .then(response => {
        if (response.status === 'success') {
          forceUpdate();
        }
      })
      .catch(() => {
        alert(I18n.t('tagging.something_went_wrong_try_again'));
    });
  };

  render() {
    const { files, onDragEvent, isDragOver, isShowMoreImages, imagesIndex, isLoading, isUpload, imagesIndexWrapper } = this.props;
    const { imageGrid, imageContainerHeight, imageGridWrapperWidth } = this.state;
    const { columnWidth, gutterSize } = imageGrid;
    const imagesList = isUpload ? [{ id: 'uploaderBox' }, ...files] : [...files];

    return (
      <Content
        ref={this.imageGridWrapperRef}
        onDragOver={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragEnter={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragLeave={(event) => { onDragEvent(event, 'isDragOver', false); }}
        onDragEnd={(event) => { onDragEvent(event, 'isDragOver', false); }}
        isDragOver={isDragOver}
        key={imagesIndexWrapper}
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
            upload={this.select}
            onShowMoreImages={this.props.onShowMoreImages}
            isShowMoreImages={isShowMoreImages}
            ratio={1.6}
            additionalImageHeight={20}
            customPositionHandler={true}
            cellContent={(props) =>
              props.item.id !== 'uploaderBox' ? this.renderImage(props) : this.renderUploadBox(props)
            }
          /> : ''}

        {isUpload && !files.length && !isLoading && this.renderUploadBox({})}

        <ShowMoreResultsSpinner show={isShowMoreImages && imagesList.length > 1}/>
      </Content>
    )
  }

  renderImage = ({ style, columnWidth, item, index }) => {
    const { tagging, imageEditor, cloudimageToken } = this.props.appState.config;
    const isTagImage = tagging.active;
    const isEditImage = imageEditor.active;
    const isImageType = isImage(item.type);
    const url = getFitResizeImageUrl(
      isImageType ? encodePermalink(getPermalink(item)) : getFileIconSrcByType(item.type),
      columnWidth,
      Math.floor(columnWidth / (item.ratio || 1.6)),
      cloudimageToken
    );

    return (
      <ImageWrapper
        style={{ ...style, width: Math.floor(columnWidth) }}
        role="button"
        tabIndex={index}
        isNotImage={!isImageType}
        onKeyDown={(event) => { this.onKeyDown(event, item); }}
      >
        <div style={{ overflow: 'hidden', background: 'rgba(155,155,155,.15)' }}>
          <Img
            src={url}
            isNotImage={!isImageType}
            height={Math.floor(columnWidth / (item.ratio || 1.6))}
          />
        </div>
        <ImageDescription>
          <ImageName>{item.name}</ImageName>
        </ImageDescription>

        <Overlay>
          <Controls>
            {isEditImage && isImageType &&
            <ControlWrapper onClick={(event) => { this.onEditImage(event, item); }}>
              <Control>
                <span>{I18n.t('file_manager.edit')}</span>
                <Icon className="sfi-airstore-edit"/>
              </Control>
            </ControlWrapper>}
            {isTagImage &&
            <ControlWrapper onClick={(event) => { this.onTagImage(event, item); }}>
              <Control>
                <span>{I18n.t('file_manager.tag')}</span>
                <Icon className="sfi-airstore-tag"/>
              </Control>
            </ControlWrapper>}
            <ControlWrapper onClick={(event) => { this.onDeleteImage(event, item); }}>
              <Control>
                <span>{I18n.t('file_manager.delete')}</span>
                <Icon className="sfi-airstore-delete"/>
              </Control>
            </ControlWrapper>
          </Controls>

          <SelectButton onClick={() => { this.select(item); }}>
            <EditButton fullBr={'4px'} success={true}>{I18n.t('file_manager.select')}</EditButton>
          </SelectButton>
        </Overlay>
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
        height={Math.floor((columnWidth / (item.ratio || 1.6)) + 20)}
      >
        <UploadBox isDragOver={isDragOver}>
          <UploadBoxIcon className={'sfi-airstore-image'}/>
          <Label center>{I18n.t('file_manager.drag_images_here')}</Label>
        </UploadBox>
      </UploadBoxWrapper>
    )
  }
}

export default UploadedImagesContent;