import React, { Component } from 'react';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsTags, activateIconsCategory, fetchIcons } from '../../actions';
import { IconsWrapper, IconTabWrapper, IconMain } from '../../styledComponents';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { IconItem, IconSidebar, SearchBar, IconTags, IconMonoColorSettings, IconAddTagModal } from '../';
import { DEFAULT_ICON_SIZE } from '../../config';
import { setAsNotRelevant, sendSelectionData } from '../../services/iconsApi.service';


class IconTab extends Component {
  state = {
    isLoading: false,
    isUploading: false,
    uploadingIcon: null,
    isSearching: false,
    activeColorType: 'multi',
    isHover: false,
    isShowMonoIconSettings: false,
    isShowIconAddTagModal: false,
    searchPhrase: '',
    activePresetTag: '',

    activeTags: {}
  };

  loadedIcons = [];

  componentDidMount() {
    this.props.onGetTags().then(() => {});

    setTimeout(this._calculateWidthOfImageWrapper);

    window.addEventListener('resize', this._calculateWidthOfImageWrapper)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._calculateWidthOfImageWrapper);
  }

  _calculateWidthOfImageWrapper = () => {
    if (!this._IconsBox) return;
    const IconsBoxPadding = 16;
    const IconsBoxClientRect = this._IconsBox.getBoundingClientRect();
    const IconsBoxWidth = IconsBoxClientRect.width - IconsBoxPadding;
    const columnsNumber = Math.floor(IconsBoxWidth / DEFAULT_ICON_SIZE);
    const restWidth = IconsBoxWidth % DEFAULT_ICON_SIZE;
    this.setState({ iconSize: DEFAULT_ICON_SIZE + (restWidth / columnsNumber) });
  }

  uploadStart = url => this.setState({ uploadingIcon: url, isUploading: true });
  uploadStop = () => this.setState({ uploadingIcon: null, isUploading: false });

  upload = (icon = null) => {
    if (this.state.isUploading) return;
    this.setState({ isLoading: true });

    const { relevantActiveTags, searchPhrase, activePresetTag } = this.state;

    sendSelectionData({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, icon.uid , this.loadedIcons);

    this.uploadStart(icon.src);
    this.props.onFileUpload(icon.src, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  addTag = (event, activeIcon) => {
    event.stopPropagation();
    this.setState({ isShowIconAddTagModal: true, activeIcon });
  }

  loadIcons = (searchParams, relevantActiveTags, cb = null) => {
    const done = (response) => {
      this.setState({ isLoading: false });
      typeof cb === 'function' && cb(response);
    };

    this.setState({ isLoading: true });
    setTimeout(() => this.props.onSearchIcons(searchParams, relevantActiveTags).then(done, done));
  };

  search = ({ value = '', type }, refreshTags) => {
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
      else if (!icons.length) this.props.showAlert('0 images was found :(', '', 'warning');

      self.setState({ isSearching: false });
    }

    this.loadIcons({ value, type }, relevantActiveTags, onSuccess);
    this.loadedIcons = [];
  };

  onSearch = () => {
    this.setState({ activePresetTag: null });
    this.search({ value: (this.state.searchPhrase || '').toLowerCase(), type: this.state.activeColorType }, true)
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
    this.props.onActivateCategory(_c, () => {
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
    const { activeColorType } = this.state;

    if (activeColorType === 'mono')
      this.setState({ activeIcon: icon, activeIconSrc: icon.src, isShowMonoIconSettings: true });
    else
      this.upload(icon);
  };

  onChangeSearchPhrase = ({ target }) => { this.setState({ searchPhrase: target.value }); }

  onActivatePresetTag = (activePresetTag) => {
    const { activeColorType } = this.state;
    this.setState({ activePresetTag, searchPhrase: '' });
    this.search({ value: activePresetTag, type: activeColorType }, true);
  }

  setAsNotRelevant = (event, activeIcon) => {
    const { active, showAlert } = this.props
    const { searchPhrase, activeTags, activePresetTag } = this.state;
    const relevantActiveTags = this.getRelevantActiveTags(activeTags, active.related_tags);
    event.stopPropagation();
    setAsNotRelevant({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, activeIcon.uid);
    showAlert('Set icon as not relevant', '', 'info');
  }

  onLoadImage = (target, icon) => {
    target.style.opacity = 1;
    target.style.background = '#fff';
    this.loadedIcons.push(icon);
  };

  render() {
    const { active = {}, uploaderConfig, showAlert } = this.props;
    const {
      isUploading, uploadingIcon, isLoading, isSearching, activeTags, isShowMonoIconSettings, activeIconSrc,
      searchPhrase, activeColorType, iconSize, isShowIconAddTagModal, activeIcon, activePresetTag
    } = this.state;
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
            title={"You can search icons here"}
            items={active.icons}
            isLoading={isLoading}
            onSearch={this.onSearch}
            isSearching={isSearching}
            searchPhrase={searchPhrase}
            onChangeSearchPhrase={this.onChangeSearchPhrase}
          />

          <IconTags
            tagsList={active.related_tags}
            searchPhrase={searchPhrase}
            activeTags={activeTags}
            toggleTag={this.toggleTag}
          />

          {isShowMonoIconSettings &&
          <IconMonoColorSettings
            upload={this.upload}
            activeIconSrc={activeIconSrc}
            onClose={() => { this.setState({ isShowMonoIconSettings: false  }); }}
          />}

          {isShowIconAddTagModal &&
          <IconAddTagModal
            isShowIconAddTagModal={isShowIconAddTagModal}
            activeIcon={activeIcon}
            upload={this.upload}
            showAlert={showAlert}
            activeIconSrc={activeIconSrc}
            isShowMonoIconSettings={isShowMonoIconSettings}
            onClose={() => { this.setState({ isShowIconAddTagModal: false  }); }}
          />}

          <IconsWrapper
            innerRef={node => this._IconsBox = node}
            id="airstore-uploader-icons-box"
          >
            {active.icons.map((icon, index) => (
              <IconItem
                key={`icon-${icon.desc}-${index}`}
                icon={icon}
                index={index}
                isUploading={isUploading}
                uploadingIcon={uploadingIcon}
                onIconClick={this.onIconClick}
                upload={this.upload}
                iconSize={iconSize}
                addTag={this.addTag}
                isShowAddTagBtn={uploaderConfig.isShowAddTagBtn}
                isShowNotRelevantBtn={uploaderConfig.isShowNotRelevantBtn}
                setAsNotRelevant={this.setAsNotRelevant}
                onLoadImage={this.onLoadImage}
              />
            ))}
          </IconsWrapper>

          <Spinner overlay show={isVisibleLoadingBlock && isLoading}/>
        </IconMain>
      </IconTabWrapper>
    );
  }
}

export default connect(
  ({ uploader: { uploaderConfig }, icons: { tags, active } }) =>
    ({ uploaderConfig, tags, active }),
  dispatch => ({
    onGetTags: () => dispatch(getIconsTags()),
    onActivateCategory: (category, onSuccess) => dispatch(activateIconsCategory(category, onSuccess)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onSearchIcons: (searchParams, relevantActiveTags) => dispatch(fetchIcons(searchParams, relevantActiveTags))
  })
)(IconTab);