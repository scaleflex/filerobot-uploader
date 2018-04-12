import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, IconsCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons } from '../actions';
import { isEnterClick } from '../utils/index';
import LazyLoad from 'react-lazy-load';
import {
  IconImage, SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, TagsWrapper, Tag, CloseIcon,
  SidebarWrap, SideBar, ColorType, ColorItem, ColorItemName, ActiveItem } from '../styledComponents/IconTab.styled';
import { Spinner } from 'scaleflex-react-ui-kit/dist';


const presetTags = [
  'accessibility',
  'arrows',
  'Audio & Video',
  'Business',
  'Charity',
  'Chat',
  'Chess',
  'Code',
  'Communication',
  'Computers',
  'Currency',
  'Date & Time',
  'Design',
  'Editors',
  'Files',
  'Genders',
  'Hands',
  'Health',
  'Images',
  'Interfaces',
  'Logistics',
  'Maps',
  'Medical',
  'Moving',
  'Objects',
  'Payments & Shopping',
  'Shapes',
  'Spinners',
  'Sports',
  'Status',
  'Users & People',
  'Vehicles',
  'Writing'
]

class IconTab extends Component {
  state = {
    height: '114px',
    isLoading: false,
    isUploading: false,
    uploadingIcon: null,
    isSearching: false,
    activeColorType: 'multi',

    activeTags: {}
  };

  componentDidMount() {
    this.props.onGetCategories().then(() => {
      //setTimeout(() => {
      //  const iconBox = document
      //    .querySelector('#airstore-uploader-categories-box .airstore-uploader-category-item:nth-child(2)');
      //
      //  if (iconBox) iconBox.focus();
      //})

    });
    setTimeout(() => {
      if (this.searchField) this.searchField.focus();
    })
  }

  uploadStart = url => this.setState({ uploadingIcon: url, isUploading: true });
  uploadStop = () => this.setState({ uploadingIcon: null, isUploading: false });

  upload = (iconUrl = null) => {
    if (this.state.isUploading) return;

    this.uploadStart(iconUrl);
    this.props.onFileUpload(iconUrl, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  loadIcons = (slug, searchParams, relevantActiveTags, cb = null) => {
    const done = () => {
      this.setState({ isLoading: false });
      typeof cb === 'function' && cb();
    };

    this.setState({ isLoading: true });
    setTimeout(() => this.props.onShowMore(slug, searchParams, relevantActiveTags).then(done, done));
  };

  //showMore = () => {
  //  if (this.state.isLoading) return;
  //  const { slug, page = 0, q = '' } = this.props.active;
  //
  //  this.loadIcons(slug, page + 1, q);
  //};

  search = ({ value = '', type }, refreshTags) => {
    const { related_tags } = this.props.active;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    this.setState({ isSearching: true, activeTags });

    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    this.loadIcons('custom-search', { value, type }, relevantActiveTags, () => this.setState({ isSearching: false }));
  };

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

    if (this.searchField.value)
      this.search({ value: this.searchField.value, type });
  }

  onLoadImage = (target) => {
    target.style.opacity = 1;
    target.style.background = '#fff';
  }

  toggleTag = (tag) => {
    const { activeTags, activeColorType } = this.state;

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags });

    setTimeout(() => {
      this.search({ value: this.searchField.value, type: activeColorType });
    });
  }

  render() {
    const { active } = this.props;

    return (
      <div style={[styles.container]}>
        {this.renderSidebar()}
        {active && this.renderContent()}
      </div>
    );
  }

  renderCategory = (itemStyles, _c, active) => {
    return (
      <ColorItem
        key={`category-${_c.slug}`}
        style={[active && _c.slug === active.slug && itemStyles.active]}
      >
        <ColorItemName>{_c.cat}</ColorItemName>
      </ColorItem>
    )
  }

  renderSidebar() {
    const { categories, active } = this.props;
    const { activeColorType } = this.state;
    const itemStyles = styles.container.sidebarWrap.sidebar.categoryItem;

    return (
      <SidebarWrap>
        <SideBar id="airstore-uploader-categories-box">
          <ColorType>
            <ColorItem
              active={activeColorType === 'all'}
              key="all-color-wrapper"
              onClick={this.toggleColorType.bind(this, 'all')}
            >
              <ActiveItem active={activeColorType === 'all'}/>
              <ColorItemName>All</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'multi'}
              key="multi-color-wrapper"
              onClick={this.toggleColorType.bind(this, 'multi')}
            >
              <ActiveItem active={activeColorType === 'multi'}/>
              <ColorItemName>Multi color</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'mono'}
              key="mono-color-wrapper"
              onClick={this.toggleColorType.bind(this, 'mono')}
            >
              <ActiveItem active={activeColorType === 'mono'}/>
              <ColorItemName>Mono color</ColorItemName>
            </ColorItem>

          </ColorType>

          {categories && categories
            .filter(category => category.slug !== 'custom-search')
            .sort((a, b) => a.cat > b.cat ? 1 : -1)
            .map(_c => this.renderCategory(itemStyles, _c, active))
          }
        </SideBar>
      </SidebarWrap>
    );
  }

  renderContent() {
    const { active } = this.props;
    const { isUploading, uploadingIcon, isLoading, isSearching, activeColorType } = this.state;
    const contentStyles = styles.container.content;
    const iconStyles = contentStyles.results.icon;
    const isEmptyIcons = (!active || !active.icons || !active.icons.length);
    const isSearch = active && active.slug && active.slug === 'custom-search';
    let isVisibleLoadingBlock = true;

    if (active && active.isLastPage) isVisibleLoadingBlock = false;
    if (isSearch && this.searchField && !this.searchField.value) isVisibleLoadingBlock = false;

    return (
      <div style={[contentStyles]}>

        <SearchWrapper empty={isEmptyIcons && !isSearching}>
          <SearchTitle show={isEmptyIcons && !isSearching}>You can search icons here</SearchTitle>
          <SearchGroup>
            <InputSearch
              type="search"
              innerRef={node => this.searchField = node}
              autoFocus={true}
              defaultValue={''}
              onKeyDown={ev => isEnterClick(ev) && this.search({ value: this.searchField.value, type: activeColorType }, true)}
            />
            <ButtonSearch
              onClick={() => this.search({ value: this.searchField.value, type: activeColorType }, true)}
            >Search</ButtonSearch>
          </SearchGroup>
        </SearchWrapper>

        <TagsWrapper>
          {active.related_tags.map(item => (
            <Tag
              hide={this.searchField.value.includes(item.tag)}
              key={item.tag}
              active={this.state.activeTags[item.tag]}
              onClick={() => { this.toggleTag(item.tag) }}
            >
              {item.tag}
              <CloseIcon active={this.state.activeTags[item.tag]}/>
            </Tag>
          ))}
        </TagsWrapper>

        {active && active.icons &&
        <div
          style={[contentStyles.results]}
          id="airstore-uploader-icons-box"
          ref={node => this._iconsWrapper = node}
        >

          {active.icons.map((icon, index) =>
            <div
              key={`icon-${icon.desc}-${index}`}
              className="airstore-uploader-icon-item"
              style={[
                iconStyles,
                isUploading && uploadingIcon === icon.src && iconStyles.loading.active,
                isUploading && uploadingIcon !== icon.src && iconStyles.loading.notActive
              ]}
              onClick={this.upload.bind(this, icon.src)}
              onKeyDown={event => { event.keyCode === 13 && this.upload(icon.src) }}
              tabIndex={0}
            >
              <div style={[iconStyles.imageWrap]}>
                <LazyLoad height={60} offsetVertical={30} throttle={200} key={icon.uid}>
                  <IconImage
                    src={icon.src}
                    width="100%"
                    height="100%"
                    alt={icon.desc}
                    onLoad={({ target }) => this.onLoadImage(target)}
                  />
                </LazyLoad>
              </div>
            </div>
          )}
        </div>
        }
        <Spinner overlay show={isVisibleLoadingBlock && isLoading}/>
      </div>
    );
  }
}

export default connect(
  ({ uploader: { uploaderConfig }, icons: { categories, active } }) =>
    ({ uploaderConfig, categories, active }),
  dispatch => ({
    onGetCategories: () => dispatch(getIconsCategories()),
    onActivateCategory: (category, onSuccess) => dispatch(activateIconsCategory(category, onSuccess)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onShowMore: (categorySlug, searchParams, relevantActiveTags) => dispatch(fetchIcons(categorySlug, searchParams, relevantActiveTags))
  })
)(Radium(IconTab));