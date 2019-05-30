import React, { Component } from 'react';
import { TabWrap, ImageContainer, ImagesListContainer, ShowMoreResultsSpinner } from '../../styledComponents';
import SearchBar from '../IconsTab/SearchBar';
import IconTags from '../IconsTab/IconTags';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';
import * as ImagesAPI from '../../services/imagesApi.service';
import { Spinner } from '../Spinner';
import { Aux } from '../hoc';
import { I18n } from 'react-i18nify';
import axios from 'axios';
import Sidebar from './ImagesSidebar';
import ColorPicker from './ImagesColorPicker';
import ImageBox from './ImageBox';
import * as API from '../../services/api.service';


class ImagesTab extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 },

      isSearching: false,
      searchPhrase: '',
      activePresetTag: '',
      activeTags: {},
      isBackground: true,
      activeColorFilters: [],
      defaultColor: '#00ff00',
      displayColorPicker: false,
      activeColorFilterIndex: null,
      isShowMoreImages: false,
      presetImagesCount: null,

      tags: [],
      backgrounds: [],
      images: [],
      related_tags: [],
      related_top_colors: []
    };
  }

  componentDidMount() {
    axios.all([
      ImagesAPI.getImagesTags(),
      ImagesAPI.getBackgrounds()
    ]).then(([tags, backgrounds]) => {
      this.setState({ tags, backgrounds }, this.updateImageGridColumnWidth);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  onChangeColorFilter = (index) => {
    this.setState({ displayColorPicker: true, activeColorFilterIndex: index });
  }

  onRemoveColorFilter = (index) => {
    const { activeColorFilters } = this.state;

    this.setState({
      activeColorFilters: [...activeColorFilters.slice(0, index), ...activeColorFilters.slice(index + 1)]
    });
    setTimeout(() => {
      const { activeColorFilters, searchPhrase, activePresetTag } = this.state;
      const value = searchPhrase || activePresetTag || '';

      this.search({ value, colorFilters: activeColorFilters }, false);
    })
  }

  addColorFilter = () => {
    const { activeColorFilters } = this.state;

    activeColorFilters.push({ value: this.state.defaultColor });
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      activeColorFilters,
      activeColorFilterIndex: activeColorFilters.length - 1,
      presetImagesCount: null
    });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false, activeColorFilterIndex: null });

    setTimeout(() => {
      const { activeColorFilters, searchPhrase, activePresetTag } = this.state;
      const value = searchPhrase || activePresetTag || '';

      this.search({ value, colorFilters: activeColorFilters }, false);
    })
  };

  handleChange = (color) => {
    const { activeColorFilters, activeColorFilterIndex } = this.state;
    activeColorFilters[activeColorFilterIndex].value = color.hex;
    this.setState({ activeColorFilters });
  };

  getImageGridWrapperWidth = () => Math.floor(this.imageGridWrapperRef.getBoundingClientRect().width - 20);

  getImageGridWrapperHeight = () => this.imageGridWrapperRef.getBoundingClientRect().height;

  updateImageGridColumnWidth = () => {
    let { imageGrid } = this.state;
    const { minColumnWidth, gutterSize } = imageGrid;
    const imageGridWrapperWidth = this.getImageGridWrapperWidth();
    const imageContainerHeight = this.getImageGridWrapperHeight();

    imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

    this.setState({ imageGridWrapperWidth, imageGrid, imageContainerHeight });
  };

  uploadStart = () => this.setState({ isLoading: true });

  uploadStop = () => this.setState({ isLoading: false });

  upload = (image = {}) => {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    this.uploadStart();

    const self = this.props;

    API.uploadFiles({
      files: [image.src],
      config: this.props.appState.config,
      data_type: 'application/json',
      showAlert: this.props.showAlert
    })
      .then(([files, isDuplicate, isReplacingData]) => {
        this.uploadStop();

        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        if (this.props.appState.config.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'IMAGES_GALLERY');
          return;
        }

        self.appState.config.uploadHandler(files, { stage: 'upload' });
        self.closeModal();
      })
      .catch(() => {
        this.uploadStop();
      })
  };

  onChangeSearchPhrase = ({ target }) => { this.setState({ searchPhrase: target.value }); }

  search = ({ value = '', colorFilters, offset = 0 }, refreshTags, resizeOnSuccess) => {
    const { related_tags } = this.state;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    const searchParams = { value, colorFilters, offset };
    const { appState } = this.props;
    const { openpixKey, limit } = appState.config;
    const isShowMore = offset > 0;

    if (!value && !colorFilters.length) return;

    this.setState({
      isSearching: true,
      activeTags,
      relevantActiveTags,
      isLoading: !searchParams.offset,
      isShowMoreImages: searchParams.offset,
      searchParams
    });

    searchParams.limit = limit;
    searchParams.colorFiltersQuery = searchParams.colorFilters
      .map(item => `&colors[]=${item.value}:1`).join('').replace(/#/g, '');

    if (!searchParams.value && !searchParams.colorFilters.length) return;

    return ImagesAPI.searchImages({ ...searchParams, openpixKey }, relevantActiveTags)
      .then((response) => {
        const { images = [], count = 0, related_tags = [], related_top_colors = [] } = response;

        if (!images.length) this.props.showAlert(I18n.t('images.zero_images_was_found'), '', 'warning');

        this.setState({
          isSearching: false,
          images: isShowMore ? [...this.state.images, ...images] : images,
          count,
          related_tags,
          related_top_colors,
          isLoading: false,
          isShowMoreImages: false
        }, () => { typeof resizeOnSuccess === 'function' && resizeOnSuccess(); });
      })
      .catch(() => {
        this.setState({ isLoading: false, isShowMoreImages: false });
      });
  };

  onShowMoreImages = (resizeOnSuccess) => {
    if (this.state.isShowMoreImages) return;

    let { searchParams, count } = this.state;

    if (count > (searchParams.offset + 100)) {
      searchParams.offset = searchParams.offset + 100;
      return this.onSearch(searchParams.offset, resizeOnSuccess);
    }
  }

  onSearch = (offset = 0, resizeOnSuccess) => {
    if (!this.state.searchPhrase && !this.state.activePresetTag) return;

    this.setState({
      activePresetTag: this.state.searchPhrase ? null : this.state.activePresetTag,
      presetImagesCount: null
    });

    return this.search(
      {
        value: (this.state.searchPhrase || this.state.activePresetTag || '').toLowerCase(),
        colorFilters: this.state.activeColorFilters,
        offset,
      }, true, resizeOnSuccess
    );
  }

  toggleTag = (tag) => {
    const { activeTags, activeColorFilters } = this.state;
    let { activePresetTag, searchPhrase } = this.state;
    if (activePresetTag === 'backgrounds') {
      activePresetTag = '';
      searchPhrase = 'backgrounds';
    }
    const value = (searchPhrase || activePresetTag || '').toLowerCase();

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags, searchPhrase, activePresetTag });

    setTimeout(() => {
      this.search({ value, colorFilters: activeColorFilters });
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

  onActivatePresetTag = (activePresetTag, count) => {
    const { activeColorFilters } = this.state;

    this.setState({ activePresetTag, searchPhrase: '', presetImagesCount: activeColorFilters.length ? null : count });
    this.search({ value: activePresetTag, colorFilters: activeColorFilters }, true);
  }

  onKeyDown = (event, image) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.upload(image);
    }
  }

  render() {
    const {
      isLoading, displayColorPicker, activeColorFilters, activeColorFilterIndex, tags, imageGrid, imageContainerHeight,
      isSearching, searchPhrase, activeTags, activePresetTag, imageGridWrapperWidth, isShowMoreImages, backgrounds,
      related_tags, images, count, presetImagesCount
    } = this.state;
    const colorFilter = activeColorFilters[activeColorFilterIndex] || {};
    const { columnWidth, gutterSize } = imageGrid;
    const isBackground = activePresetTag === 'backgrounds';
    const imagesList = isBackground ? [...backgrounds, ...images] : images;

    return (
      <TabWrap>
        <Sidebar
          {...{ activePresetTag, activeColorFilters, tags, backgrounds }}
          onChangeColorFilter={this.onChangeColorFilter}
          onRemoveColorFilter={this.onRemoveColorFilter}
          addColorFilter={this.addColorFilter}
          onActivatePresetTag={this.onActivatePresetTag}
        />

        <ImageContainer>
          <SearchBar
            {...{ isLoading, isSearching, searchPhrase, count, presetImagesCount }}
            items={images}
            title={I18n.t('images.you_can_search_images_here')}
            onSearch={this.onSearch}
            onChangeSearchPhrase={this.onChangeSearchPhrase}
          />

          <IconTags {...{ searchPhrase, activeTags }} tagsList={related_tags} toggleTag={this.toggleTag}/>

          <ImagesListContainer ref={node => this.imageGridWrapperRef = node}>
            {(imagesList.length && imageContainerHeight && columnWidth && !isLoading) ?
              <Aux>
                <VirtualizedImagesGrid
                  {...{ imageGridWrapperWidth, imageContainerHeight, columnWidth, gutterSize, isShowMoreImages }}
                  count={imagesList.length}
                  list={imagesList}
                  upload={this.upload}
                  onShowMoreImages={this.onShowMoreImages}
                  cellContent={(props) => <ImageBox props={props} upload={this.upload} onKeyDown={this.onKeyDown}/>}
                />
                <ShowMoreResultsSpinner show={isShowMoreImages}/>
              </Aux>
              : null}
          </ImagesListContainer>
        </ImageContainer>

        {displayColorPicker &&
        <ColorPicker {...{ colorFilter }} handleClose={this.handleClose} handleChange={this.handleChange}/>}

        <Spinner overlay show={isLoading}/>
      </TabWrap>
    )
  }
}


export default ImagesTab;