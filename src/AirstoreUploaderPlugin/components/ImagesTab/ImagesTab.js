import React, { Component } from 'react';
import Radium from 'radium';
import { getBackgrounds, uploadFilesFromUrls } from '../../actions/index';
import { connect } from 'react-redux';
import {
  SidebarWrap, ColorItem, ColorItemName, TabWrap, SideBar, ColorType, ImageContainer, ImagesListContainer
} from '../../styledComponents';
import { SearchBar, IconTags } from '../';
import VirtualizedImagesGrid from './VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { fetchImages } from '../../actions'


class ImagesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uploadingUuid: null,
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 },

      isSearching: false,
      searchPhrase: '',
      activePresetTag: '',
      activeTags: {}
    };
    this.imageGridWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.props.onGetBackgrounds();
    this.updateImageGridColumnWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  getImageGridWrapperWidth = () => Math.floor(this.imageGridWrapperRef.current.getBoundingClientRect().width - 20);
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

  upload = (image = {}) => {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    this.uploadStart(image.uid);
    this.props.onFileUpload(image.src, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  onChangeSearchPhrase = ({ target }) => { this.setState({ searchPhrase: target.value }); }

  search = ({ value = '', type }, refreshTags) => {
    const self = this;
    const { related_tags } = this.props;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    this.setState({ isSearching: true, activeTags, relevantActiveTags });
    const onSuccess = (response) => {
      const { payload = {} } = response;
      const { images = [] } = payload;
      if (!images.length) this.props.showAlert('0 images was found :(', '', 'warning');
      self.setState({ isSearching: false });
    }

    this.loadIcons({ value, type }, relevantActiveTags, onSuccess);
    this.loadedIcons = [];
  };

  onSearch = () => {
    this.setState({ activePresetTag: null });
    this.search({ value: (this.state.searchPhrase || '').toLowerCase(), type: this.state.activeColorType }, true);
  }

  loadIcons = (searchParams, relevantActiveTags, cb = null) => {
    const done = (response) => {
      this.setState({ isLoading: false });
      typeof cb === 'function' && cb(response);
    };

    this.setState({ isLoading: true });
    setTimeout(() => this.props.onSearchImages(searchParams, relevantActiveTags).then(done, done));
  };

  toggleTag = (tag) => {
    const { activeTags, activeColorType, searchPhrase, activePresetTag } = this.state;
    const value = (searchPhrase || activePresetTag || '').toLowerCase();

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags });

    setTimeout(() => {
      this.search({ value, type: activeColorType });
    });
  };

  getRelevantActiveTags = (activeTags, related_tags) => {
    const result = [];

    for (let tag in activeTags) {
      if (activeTags[tag] && related_tags.find(item => item.tag === tag) && activeTags.hasOwnProperty(tag))
        result.push(tag);
    }

    return result;
  }

  render() {
    const { isLoading } = this.state;

    return (
      <TabWrap>
        {this.renderSidebar()}
        {this.renderContent()}
        <Spinner overlay show={isLoading}/>
      </TabWrap>
    )
  }

  renderSidebar = () => {
    return (
      <SidebarWrap>
        <SideBar>
          <ColorType>
            <ColorItem active={false} key="type-of-background-one">
              <ColorItemName>Backgrounds</ColorItemName>
            </ColorItem>
            <ColorItem active={true} key="type-of-background-two">
              <ColorItemName>Interface</ColorItemName>
            </ColorItem>
          </ColorType>
        </SideBar>
      </SidebarWrap>
    )
  };

  renderContent = () => {
    const { related_tags, images } = this.props;
    const { imageGrid, imageContainerHeight, isLoading, isSearching, searchPhrase, activeTags } = this.state;
    const { columnWidth, gutterSize } = imageGrid;

    return (
      <ImageContainer innerRef={this.imageGridWrapperRef}>
        <SearchBar
          title={"You can search images here"}
          items={images}
          isLoading={isLoading}
          onSearch={this.onSearch}
          isSearching={isSearching}
          searchPhrase={searchPhrase}
          onChangeSearchPhrase={this.onChangeSearchPhrase}
        />

        <IconTags
          tagsList={related_tags}
          searchPhrase={searchPhrase}
          activeTags={activeTags}
          toggleTag={this.toggleTag}
        />

        {(images.length && imageContainerHeight && columnWidth && !isLoading) ?
          <ImagesListContainer>
            <VirtualizedImagesGrid
              imageContainerHeight={imageContainerHeight}
              columnWidth={columnWidth}
              gutterSize={gutterSize}
              imagesNumber={images.length}
              images={images}
              upload={this.upload}
            />
          </ImagesListContainer>
         : null}
      </ImageContainer>
    )
  }
}

export default connect(
  ({ uploader: { backgrounds, uploaderConfig }, images: { images, related_tags } }) =>
    ({ backgrounds, uploaderConfig, images, related_tags }),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onGetBackgrounds: () => dispatch(getBackgrounds()),
    onSearchImages: (searchParams, relevantActiveTags) => dispatch(fetchImages(searchParams, relevantActiveTags))
  })
)(Radium(ImagesTab));