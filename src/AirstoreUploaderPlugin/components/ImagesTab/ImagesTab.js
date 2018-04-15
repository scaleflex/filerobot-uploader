import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, BgCss as styles } from '../../assets/styles/index';
import { getBackgrounds, uploadFilesFromUrls } from '../../actions/index';
import { connect } from 'react-redux';
import {
  SidebarWrap, ColorItem, ColorItemName, TabWrap, SideBar, ColorType, ImageContainer
} from '../../styledComponents';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';


class ImagesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uploadingUuid: null,
      imageGridWrapperWidth: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 }
    };
    this.imageGridWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.updateImageGridColumnWidth();
    this.props.onGetBackgrounds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  getImageGridWrapperWidth = () => this.imageGridWrapperRef.current.getBoundingClientRect().width;
  getImageGridWrapperHeight = () => this.imageGridWrapperRef.current.getBoundingClientRect().height;

  updateImageGridColumnWidth = () => {
    let { imageGrid } = this.state;
    const { minColumnWidth, gutterSize } = imageGrid;
    const imageGridWrapperWidth = this.getImageGridWrapperWidth();
    const imageContainerHeight = this.getImageGridWrapperHeight();

    imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

    this.setState({ imageGridWrapperWidth, imageGrid, imageContainerHeight });
  };

  uploadStart = uuid => this.setState({ uploadingUuid: uuid, isLoading: true });

  uploadStop = () => this.setState({ uploadingUuid: null, isLoading: false });

  upload = (bg = {}) => {
    if (this.state.isLoading) return;

    this.uploadStart(bg.uuid);
    this.props.onFileUpload(bg.url_public, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  onKeyDown = (event, bg) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.upload(bg);
    }
  }

  render() {
    return (
      <TabWrap>
        {this.renderSidebar()}
        {this.renderContent()}
      </TabWrap>
    )
  }

  renderSidebar = () => {
    return (
      <SidebarWrap>
        <SideBar>
          <ColorType>
            <ColorItem
              active={false}
              key="type-of-background-one"
              // onClick={}
            >
              <ColorItemName>Transport</ColorItemName>
            </ColorItem>
            <ColorItem
              active={true}
              key="type-of-background-two"
              // onClick={}
            >
              <ColorItemName>Interface</ColorItemName>
            </ColorItem>
          </ColorType>
        </SideBar>
      </SidebarWrap>
    )
  };

  renderContent = () => {
    const { imageGrid, imageContainerHeight } = this.state;
    const { columnWidth, gutterSize } = imageGrid;
    const itemStyles = styles.container.item;
    console.log(this.props.backgrounds, columnWidth, gutterSize, this.props.backgrounds.length);
    return (
      <ImageContainer innerRef={this.imageGridWrapperRef}>
        {this.props.backgrounds.length &&
        <VirtualizedImagesGrid
          imageContainerHeight={imageContainerHeight}
          columnWidth={columnWidth}
          gutterSize={gutterSize}
          imagesNumber={this.props.backgrounds.length}
          images={this.props.backgrounds}
        />}
        {/*{this.props.backgrounds.map((image, index) =>*/}
        {/*<div*/}
        {/*style={[*/}
        {/*itemStyles,*/}
        {/*isLoading && uploadingUuid === bg.uuid && itemStyles.loading.active,*/}
        {/*isLoading && uploadingUuid !== bg.uuid && itemStyles.loading.notActive*/}
        {/*]}*/}
        {/*key={`bg-${image.id}`}*/}
        {/*onClick={this.upload.bind(this, image)}*/}
        {/*role="button"*/}
        {/*tabIndex={0}*/}
        {/*onKeyDown={event => this.onKeyDown(event, image)}*/}
        {/*>*/}
        {/*<span style={[ styles.container.item.alignmentBlock ]}/>*/}
        {/*<img*/}
        {/*style={[ styles.container.item.img ]}*/}
        {/*src={image.src}*/}
        {/*alt={image.alt || `background ${index + 1}`}*/}
        {/*width="100%"*/}
        {/*height="auto"*/}
        {/*/>*/}
        {/*</div>*/}
        {/*)}*/}
      </ImageContainer>
    )
  }
}

export default connect(
  ({ uploader: { backgrounds, uploaderConfig } }) => ({ backgrounds, uploaderConfig }),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onGetBackgrounds: () => dispatch(getBackgrounds())
  })
)(Radium(ImagesTab));