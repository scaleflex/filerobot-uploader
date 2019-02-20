import React, { Component } from 'react';
import { IconsWrapper, IconTabWrapper, IconMain, IconBoxWrapper, ShowMoreResultsSpinner } from '../../styledComponents';
import { Spinner } from '../Spinner';
import IconItem from '../IconsTab/IconItem';
import IconSidebar from '../IconsTab/IconSidebar';
import SearchBar from '../IconsTab/SearchBar';
import IconTags from '../IconsTab/IconTags';
import IconMonoColorSettings from '../IconsTab/IconMonoColorSettings';
import IconAddTagModal from '../IconsTab/IconAddTagModal';
import { DEFAULT_ICON_SIZE } from '../../config';
import { setAsNotRelevant, sendSelectionData } from '../../services/iconsApi.service';
import * as ImageGridService from '../../services/imageGrid.service';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import { I18n } from 'react-i18nify';
import * as IconAPI from '../../services/iconsApi.service';
import * as API from '../../services/api.service';


const defaultTags = [
  { slug: 'custom-famous', cat: 'Famous' },
  { slug: 'custom-search', cat: 'Search', count: 0 }
];


class IconTab extends Component {
  state = {
    isLoading: false,
    isSearching: false,
    activeColorType: 'all',
    isShowMonoIconSettings: false,
    isShowIconAddTagModal: false,
    searchPhrase: '',
    activePresetTag: '',
    imageGridWrapperWidth: 0,
    imageContainerHeight: 0,
    imageGrid: { columnWidth: 0, gutterSize: 4, minColumnWidth: DEFAULT_ICON_SIZE },
    isShowMoreImages: false,

    activeTags: {},

    active: {
      slug: 'custom-search',
      icons: [],
      related_tags: []
    },
    tags: [...defaultTags]
  };

  loadedIcons = [];

  componentDidMount() {
    IconAPI.getTags().then(tags => {
      this.setState({ tags: [...defaultTags, ...tags] }, this.updateImageGridColumnWidth);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  uploadStart = () => this.setState({ isLoading: true });

  uploadStop = () => this.setState({ isLoading: false });

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

  upload = (icon = null) => {
    this.uploadStart();
    const { relevantActiveTags, searchPhrase, activePresetTag } = this.state;

    sendSelectionData({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, icon.uid, this.loadedIcons);
    const self = this.props;

    API.uploadFiles([icon.src], this.props.appState.config, 'application/json')
      .then(([files, isDuplicate, isReplacingData]) => {
        this.uploadStop();

        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        if (this.props.appState.config.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'ICONS_GALLERY');
          return;
        }

        self.appState.config.uploadHandler(files);
        self.closeModal();
      })
      .catch(() => {
        this.uploadStop();
      });
  };

  addTag = (event, activeIcon) => {
    event.stopPropagation();
    this.setState({ isShowIconAddTagModal: true, activeIcon });
  }

  search = ({ value = '', type, offset = 0 }, refreshTags, resizeOnSuccess) => {
    const { active } = this.state;
    const { related_tags } = active;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    const { openpixKey } = this.props.appState.config;
    const isShowMore = !offset;
    let searchParams = { value, type, offset };

    this.setState({
      isSearching: true,
      activeTags,
      relevantActiveTags,
      isLoading: !searchParams.offset,
      isShowMoreImages: searchParams.offset
    });

    switch (searchParams.type) {
      case 'all':
        searchParams.typeQuery = '&style[]=FLAT&style[]=MONOCOLOR';
        break;
      case 'multi':
        searchParams.typeQuery = '&style[]=FLAT';
        break;
      case 'mono':
        searchParams.typeQuery = '&style[]=MONOCOLOR';
        break;
    }

    if (!searchParams.value) return;

    IconAPI.searchIcons({ ...searchParams, openpixKey }, relevantActiveTags)
      .then((response = {}) => {
        let { count = 0, icons = [], related_tags = [], searchParams = {} } = response;

        if (!icons.length && relevantActiveTags.length) {
          this.search({ value, type }, true);
          return;
        }
        else if (!icons.length) this.props.showAlert(I18n.t('icons.zero_icons_was_found'), '', 'warning');

        this.setState({
          isSearching: false,
          active: {
            icons: isShowMore ? [active.icons, ...icons] : icons,
            related_tags
          },
          count,
          searchParams
        });

        typeof resizeOnSuccess === 'function' && resizeOnSuccess();
      })
      .finally(() => {
        this.setState({ isLoading: false, isShowMoreImages: false });
      });

    this.loadedIcons = [];
  };

  onSearch = (offset = 0, resizeOnSuccess) => {
    if (!this.state.searchPhrase && !this.state.activePresetTag) return;

    this.setState({ activePresetTag: this.state.searchPhrase ? null : this.state.activePresetTag });
    this.search({
        value: (this.state.searchPhrase || this.state.activePresetTag || '').toLowerCase(),
        type: this.state.activeColorType,
        offset
      },
      true,
      resizeOnSuccess
    );
  }

  onShowMoreImages = (resizeOnSuccess) => {
    if (this.state.isShowMoreImages) return;

    let { searchParams, count } = this.state;

    if (count > (searchParams.offset + 250)) {
      searchParams.offset = searchParams.offset + 250;
      return this.onSearch(searchParams.offset, resizeOnSuccess);
    }
  }

  getRelevantActiveTags = (activeTags, related_tags) => {
    const result = [];

    for (let tag in activeTags) {
      if (activeTags[tag] && related_tags.find(item => item.tag === tag) && activeTags.hasOwnProperty(tag))
        result.push(tag);
    }

    return result;
  }

  toggleColorType = (type) => {
    this.setState({ activeColorType: type });
    const value = (this.state.searchPhrase || this.state.activePresetTag || '').toLowerCase();

    if (value)
      this.search({ value, type });
  }

  toggleTag = (tag) => {
    const { activeTags, activeColorType, searchPhrase, activePresetTag } = this.state;
    const value = (searchPhrase || activePresetTag || '').toLowerCase();

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags });

    setTimeout(() => {
      this.search({ value, type: activeColorType });
    });
  };

  onIconClick = (icon) => {
    if (icon.style === 'MONOCOLOR')
      this.setState({ activeIcon: icon, activeIconSrc: icon.src, isShowMonoIconSettings: true });
    else
      this.upload(icon);
  };

  onChangeSearchPhrase = ({ target }) => { this.setState({ searchPhrase: target.value }); }

  onActivatePresetTag = (activePresetTag) => {
    const { activeColorType } = this.state;
    this.setState({ activePresetTag, searchPhrase: '', });
    this.search({ value: activePresetTag, type: activeColorType }, true);
  }

  setAsNotRelevant = (event, activeIcon) => {
    const { showAlert } = this.props
    const { searchPhrase, activeTags, activePresetTag, active } = this.state;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, active.related_tags);
    event.stopPropagation();
    setAsNotRelevant({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, activeIcon.uid);
    showAlert(I18n.t('icons.set_icon_as_not_relevant'), '', 'info');
  }

  onLoadImage = (target, icon) => { this.loadedIcons.push(icon); };

  render() {
    const { tags, active = {}, count } = this.state;
    const { appState, showAlert, themeColors } = this.props;
    const { isShowAddTagBtn, isShowNotRelevantBtn } = appState;
    const {
      isLoading, isSearching, activeTags, isShowMonoIconSettings, activeIconSrc, searchPhrase, activeColorType,
      isShowIconAddTagModal, activeIcon, activePresetTag, imageGridWrapperWidth, imageContainerHeight, imageGrid,
      isShowMoreImages
    } = this.state;
    const { columnWidth, gutterSize } = imageGrid;

    return (
      <IconTabWrapper>
        <IconSidebar
          {...{ activePresetTag, activeColorType, tags, active }}
          onActivatePresetTag={this.onActivatePresetTag}
          toggleColorType={this.toggleColorType}
        />

        <IconMain>
          <SearchBar
            {...{ isLoading, isSearching, searchPhrase, count }}
            title={I18n.t('icons.you_can_search_icons_here')}
            items={active.icons}
            onSearch={this.onSearch}
            onChangeSearchPhrase={this.onChangeSearchPhrase}
          />

          <IconTags
            {...{ searchPhrase, activeTags }}
            tagsList={active.related_tags}
            toggleTag={this.toggleTag}
          />

          {isShowMonoIconSettings &&
          <IconMonoColorSettings
            {...{ themeColors, activeIconSrc }}
            upload={this.upload}
            onClose={() => { this.setState({ isShowMonoIconSettings: false }); }}
          />}

          {isShowIconAddTagModal &&
          <IconAddTagModal
            {...{ isShowIconAddTagModal, activeIcon, showAlert, activeIconSrc, isShowMonoIconSettings }}
            upload={this.upload}
            onClose={() => { this.setState({ isShowIconAddTagModal: false }); }}
          />}

          <IconsWrapper
            innerRef={node => this.imageGridWrapperRef = node}
            id="airstore-uploader-icons-box"
          >
            {active.icons.length && !isLoading && columnWidth ?
              <VirtualizedImagesGrid
                {...{ imageGridWrapperWidth, imageContainerHeight, columnWidth, gutterSize, isShowMoreImages }}
                count={active.icons.length}
                list={active.icons}
                upload={this.upload}
                onShowMoreImages={this.onShowMoreImages}
                cellContent={({ style, columnWidth, item, index }) => (
                  <IconBoxWrapper style={{ ...style, width: Math.floor(columnWidth) }}>
                    <IconItem
                      {...{ index, isShowAddTagBtn, isShowNotRelevantBtn }}
                      columnWidth={Math.floor(columnWidth)}
                      icon={item}
                      onIconClick={this.onIconClick}
                      upload={this.upload}
                      addTag={this.addTag}
                      setAsNotRelevant={this.setAsNotRelevant}
                      onLoadImage={this.onLoadImage}
                    />
                  </IconBoxWrapper>
                )}
              /> : null}
            <ShowMoreResultsSpinner show={isShowMoreImages && active.icons.length}/>
          </IconsWrapper>

          <Spinner overlay show={isLoading}/>
        </IconMain>
      </IconTabWrapper>
    );
  }
}


export default IconTab;