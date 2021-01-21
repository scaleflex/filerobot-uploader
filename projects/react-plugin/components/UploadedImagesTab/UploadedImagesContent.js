import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import {
  Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img, ImageDescription, ImageName,
  ShowMoreResultsSpinner, Overlay, SelectButton, EditButton, Controls, ControlsWrapper, ControlWrapper, Control, Icon,
  Checkbox, CheckBoxWrapper
} from '../../styledComponents';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import { getActualColumnWidth, getFitResizeImageUrl } from '../../services/imageGrid.service';
import { getFileIconSrcByType, isImage } from '../../utils/icons.utils';
import { I18n } from 'react-i18nify';
import { encodePermalink } from '../../utils';
import { getCDNlink } from '../../utils/adjustAPI.utils';
import { getContentWithNumber } from '../../assets/translations/utils';


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
    document.addEventListener('click', this.handleOutsideMouseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideMouseClick);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  handleOutsideMouseClick = e => {
    if (this.imageGridWrapperRef && this.imageGridWrapperRef.current && !this.imageGridWrapperRef.current.contains(e.target)) {
      this.props.updateTabState({ selectedItems: [] }, this.props.forceUpdate);
    }
  };

  getImageGridWrapperPosition = () => {
    const imageGridInnerWrapper = document.querySelector('#image-grid-wrapper > div');

    if (imageGridInnerWrapper) {
      const { top, left } = imageGridInnerWrapper.getBoundingClientRect();

      this.setState({ top, left });
    }
  };

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
  };

  select = (image) => {
    const { files, selectedItems, appState } = this.props;
    const { options } = appState;
    const isForceUpload = this.props.appState.config.uploadParams.opt_force_name;
    let nextFiles = [];

    selectedItems.length ?
      nextFiles = files
        .filter(file => selectedItems.find(item => item === file.uuid))
        .map(item => ({ ...item, public_link: getCDNlink(item) }))
      :
      nextFiles = [{ ...image, public_link: getCDNlink(image) }];

    if (isForceUpload) {
      this.props.upload(true, nextFiles.map(file => getCDNlink(file)));
    } else {
      this.props.appState.config.uploadHandler(nextFiles, { stage: 'select' });
      if (options.closeOnSave) this.props.closeModal();
    }
  };

  modify = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.imageEditor.active) {
      const { path } = this.props;
      const files = [{ ...item, public_link: getCDNlink(item) }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path, modifyURL: true });
    }
  }

  onTagImage = (event, image) => {
    event.preventDefault();
    event.stopPropagation();
    const { files, selectedItems } = this.props;

    if (this.props.appState.config.tagging.active) {
      let nextFiles = [];

      selectedItems.length ?
        nextFiles = files
          .filter(file => selectedItems.find(item => item === file.uuid))
          .map(item => ({ ...item, public_link: getCDNlink(item) }))
        :
        nextFiles = [{ ...image, public_link: getCDNlink(image) }];

      this.props.saveUploadedFiles(nextFiles);
      this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY', { isClickedTagsBtn: true });
    }
  };

  onEditImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.imageEditor.active) {
      const { path } = this.props;
      const files = [{ ...item, public_link: getCDNlink(item) }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path });
    }
  };

  toggleChecked = uuid => {
    const { selectedItems } = this.props;
    const nextSelectedItems = [...selectedItems];
    const index = nextSelectedItems.findIndex(item => item === uuid);

    nextSelectedItems.includes(uuid) ? nextSelectedItems.splice(index, 1) : nextSelectedItems.push(uuid);
    this.props.updateTabState({ selectedItems: nextSelectedItems }, this.props.forceUpdate);
  };

  render() {
    const {
      files, onDragEvent, isDragOver, isShowMoreImages, imagesIndex, isLoading, isUpload, imagesIndexWrapper
    } = this.props;
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
            getImageGridWrapperPosition={this.getImageGridWrapperPosition}
            cellContent={(props) => props.item && (props.item.id !== 'uploaderBox') ? this.renderImage(props) : this.renderUploadBox(props)
            }
          /> : ''}

        {isUpload && !files.length && !isLoading && this.renderUploadBox({})}

        <ShowMoreResultsSpinner show={isShowMoreImages && imagesList.length > 1}/>
      </Content>
    );
  }

  renderImage = ({ style, columnWidth, item, index }) => {
    const { selectedItems, appState } = this.props;
    const { top, left } = this.state;
    const { tagging, imageEditor, cloudimageToken, modifyURLButton, deleteButton } = appState.config;
    const isTagImage = tagging.active;
    const isEditImage = imageEditor.active;
    const isImageType = isImage(item.type);
    const url = getFitResizeImageUrl(
      isImageType ? encodePermalink(getCDNlink(item)) : getFileIconSrcByType(item.type),
      columnWidth,
      Math.floor(columnWidth / (item.ratio || 1.6)),
      cloudimageToken
    );
    const isChecked = selectedItems.includes(item.uuid);
    const isCheckedOne = selectedItems.length === 1 || !selectedItems.length;

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

        <Overlay checked={isChecked}>
          <CheckBoxWrapper>
            <Checkbox
              data-place="bottom"
              data-tip={getContentWithNumber(I18n.t('tips.select_multiply'), selectedItems.length)}
              checked={isChecked}
              onChange={() => this.toggleChecked(item.uuid)}
            />
          </CheckBoxWrapper>

          <ControlsWrapper>
            <Controls>
              {isEditImage && isImageType && isCheckedOne &&
              <ControlWrapper onClick={(event) => { this.onEditImage(event, item); }}>
                <Control data-tip={I18n.t('tips.edit')}>
                  <span>{I18n.t('file_manager.edit')}</span>
                  <Icon className="sfi-airstore-edit"/>
                </Control>
              </ControlWrapper>}
              {isTagImage &&
              <ControlWrapper onClick={(event) => { this.onTagImage(event, item); }}>
                <Control data-tip={getContentWithNumber(I18n.t('tips.tag'), selectedItems.length)}>
                  <span>{I18n.t('file_manager.tag')}{!isCheckedOne ? ` (${selectedItems.length})` : ''}</span>
                  <Icon className="sfi-airstore-tag"/>
                </Control>
              </ControlWrapper>}
              {deleteButton &&
              <ControlWrapper onClick={() => this.props.onClickDelete(item)}>
                <Control data-tip={getContentWithNumber(I18n.t('tips.delete'), selectedItems.length)}>
                  <span>{I18n.t('file_manager.delete')}{!isCheckedOne ? ` (${selectedItems.length})` : ''}</span>
                  <Icon className="sfi-airstore-delete"/>
                </Control>
              </ControlWrapper>}
            </Controls>


            <SelectButton>
              <EditButton
                fullBr={'4px'}
                isCheckedOne={isCheckedOne}
                success={true}
                onClick={() => { this.select(item); }}
                data-tip={getContentWithNumber(I18n.t('tips.select'), selectedItems.length)}
              >{I18n.t('file_manager.select')}{!isCheckedOne ? ` (${selectedItems.length})` : ''}</EditButton>
              {isCheckedOne && modifyURLButton &&
              <EditButton
                fullBr={'4px'}
                isCheckedOne={true}
                primary={true}
                onClick={event => { this.modify(event, item); }}
                data-tip={I18n.t('tips.modify')}
              >{I18n.t('file_manager.modify')}{!isCheckedOne ? ` (${selectedItems.length})` : ''}</EditButton>}
            </SelectButton>
          </ControlsWrapper>
        </Overlay>

        <ReactTooltip offset={{ top, left }} delayShow={700} effect="solid"/>
      </ImageWrapper>
    );
  };

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
    );
  };
}

export default UploadedImagesContent;
