import React, { Component } from 'react';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsTags, activateIconsCategory, fetchIcons, modalClose } from '../../actions';
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

    activeTags: {}
  };

  loadedIcons = [];

  componentDidMount() {
    this.props.getIconsTags();
    this.updateImageGridColumnWidth();
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

    uploadFilesFromUrls([icon.src], this.props.uploaderConfig)
      .then(([files, isDuplicate, isReplacingData]) => {
        this.uploadStop();

        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        if (this.props.uploaderConfig.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'ICONS_GALLERY');
          return;
        }

        self.uploaderConfig.uploadHandler(files);

        if (this.props.onClose) this.props.onClose();

        self.modalClose();
      })
      .catch(() => {
        this.uploadStop();
      });
  };

  addTag = (event, activeIcon) => {
    event.stopPropagation();
    this.setState({ isShowIconAddTagModal: true, activeIcon });
  }

  loadIcons = (searchParams, relevantActiveTags, cb = null) => {
    const { openpixKey } = this.props.uploaderConfig;
    const done = (response) => {
      typeof cb === 'function' && cb(response);
      this.setState({ isLoading: false, isShowMoreImages: false });
    };

    this.setState({ isLoading: !searchParams.offset, isShowMoreImages: searchParams.offset });

    return this.props.fetchIcons({ ...searchParams, openpixKey }, relevantActiveTags, done)
  };

  search = ({ value = '', type, offset = 0 }, refreshTags, resizeOnSuccess) => {
    const self = this;
    const { related_tags } = this.props.active;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    this.setState({ isSearching: true, activeTags, relevantActiveTags });
    const onSuccess = (response) => {
      const { payload = {} } = response;
      const { icons = [] } = payload;
      if (!icons.length && relevantActiveTags.length) {
        this.search({ value, type }, true);
        return;
      }
      else if (!icons.length) this.props.showAlert(I18n.t('icons.zero_icons_was_found'), '', 'warning');

      self.setState({ isSearching: false });
      typeof resizeOnSuccess === 'function' && resizeOnSuccess();
    }

    this.loadIcons({ value, type, offset }, relevantActiveTags, onSuccess);
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

    let { searchParams, count } = this.props;

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

  activateCategory = (_c) => {
    this.setState({ [_c.slug]: !this.state[_c.slug], isSearching: true });
    this.props.activateIconsCategory(_c, () => {
      //const iconBox = document
      //  .querySelector('#airstore-uploader-icons-box .airstore-uploader-icon-item:first-child');
      //if (iconBox) iconBox.focus();
      this.setState({ isSearching: false });
    });
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
    const { active, showAlert } = this.props
    const { searchPhrase, activeTags, activePresetTag } = this.state;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, active.related_tags);
    event.stopPropagation();
    setAsNotRelevant({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, activeIcon.uid);
    showAlert(I18n.t('icons.set_icon_as_not_relevant'), '', 'info');
  }

  onLoadImage = (target, icon) => { this.loadedIcons.push(icon); };

  render() {
    const { active = {}, uploaderConfig, showAlert, count, themeColors } = this.props;
    const {
      isLoading, isSearching, activeTags, isShowMonoIconSettings, activeIconSrc, searchPhrase, activeColorType,
      isShowIconAddTagModal, activeIcon, activePresetTag, imageGridWrapperWidth, imageContainerHeight, imageGrid,
      isShowMoreImages
    } = this.state;
    const { columnWidth, gutterSize } = imageGrid;
    const isSearch = active && active.slug && active.slug === 'custom-search';
    let isVisibleLoadingBlock = !(active && active.isLastPage || isSearch && !this.state.searchPhrase);

    return (
      <IconTabWrapper>
        <IconSidebar
          activePresetTag={activePresetTag}
          onActivatePresetTag={this.onActivatePresetTag}
          toggleColorType={this.toggleColorType}
          activeColorType={activeColorType}
        />

        <IconMain>
          <SearchBar
            title={I18n.t('icons.you_can_search_icons_here')}
            items={active.icons}
            isLoading={isLoading}
            onSearch={() => { this.onSearch(); }}
            isSearching={isSearching}
            searchPhrase={searchPhrase}
            onChangeSearchPhrase={this.onChangeSearchPhrase}
            count={count}
          />

          <IconTags
            tagsList={active.related_tags}
            searchPhrase={searchPhrase}
            activeTags={activeTags}
            toggleTag={this.toggleTag}
          />

          {isShowMonoIconSettings &&
          <IconMonoColorSettings
            themeColors={themeColors}
            upload={this.upload}
            activeIconSrc={activeIconSrc}
            onClose={() => { this.setState({ isShowMonoIconSettings: false }); }}
          />}

          {isShowIconAddTagModal &&
          <IconAddTagModal
            isShowIconAddTagModal={isShowIconAddTagModal}
            activeIcon={activeIcon}
            upload={this.upload}
            showAlert={showAlert}
            activeIconSrc={activeIconSrc}
            isShowMonoIconSettings={isShowMonoIconSettings}
            onClose={() => { this.setState({ isShowIconAddTagModal: false }); }}
          />}

          <IconsWrapper
            innerRef={node => this.imageGridWrapperRef = node}
            id="airstore-uploader-icons-box"
          >
            {active.icons.length && !isLoading && columnWidth ?
              <VirtualizedImagesGrid
                imageGridWrapperWidth={imageGridWrapperWidth}
                imageContainerHeight={imageContainerHeight}
                columnWidth={columnWidth}
                gutterSize={gutterSize}
                count={active.icons.length}
                list={active.icons}
                upload={this.upload}
                onShowMoreImages={this.onShowMoreImages}
                isShowMoreImages={isShowMoreImages}
                cellContent={({ style, columnWidth, item, index }) => (
                  <IconBoxWrapper style={{ ...style, width: Math.floor(columnWidth) }}>
                    <IconItem
                      columnWidth={Math.floor(columnWidth)}
                      icon={item}
                      index={index}
                      onIconClick={this.onIconClick}
                      upload={this.upload}
                      addTag={this.addTag}
                      isShowAddTagBtn={uploaderConfig.isShowAddTagBtn}
                      isShowNotRelevantBtn={uploaderConfig.isShowNotRelevantBtn}
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

const mapStateToProps = state => ({
  uploaderConfig: state.uploader.uploaderConfig,
  tags: state.icons.tags,
  active: state.icons.active,
  searchParams: state.icons.searchParams,
  count: state.icons.count
});

export default connect(
  mapStateToProps,
  {
    getIconsTags,
    activateIconsCategory,
    fetchIcons,
    modalClose
  }
)(IconTab);