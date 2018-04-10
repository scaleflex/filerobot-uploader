import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, IconsCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons } from '../actions';
import { isEnterClick } from '../utils/index';
import LazyLoad from 'react-lazy-load';
import {
  IconImage, SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, TagsWrapper, Tag, CloseIcon
} from '../styledComponents/IconTab.styled';
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
    isMonoColor: false,
    isMultiColor: true,

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

  loadIcons = (slug, q = '', relevantActiveTags, cb = null) => {
    const done = () => {
      this.setState({ isLoading: false });
      typeof cb === 'function' && cb();
    };

    this.setState({ isLoading: true });
    setTimeout(() => this.props.onShowMore(slug, q, relevantActiveTags).then(done, done));
  };

  showMore = () => {
    if (this.state.isLoading) return;
    const { slug, page = 0, q = '' } = this.props.active;

    this.loadIcons(slug, page + 1, q);
  };

  search = (q = '', refreshTags) => {
    const { related_tags } = this.props.active;
    const activeTags = refreshTags ? {} : this.state.activeTags;
    this.setState({ isSearching: true, activeTags });

    const relevantActiveTags = this.getRelevantActiveTags(activeTags, related_tags);
    this.loadIcons('custom-search', q, relevantActiveTags, () => this.setState({ isSearching: false }));
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
      <div
        key={`category-${_c.slug}`}
        className="airstore-uploader-category-item"
        style={[itemStyles, active && _c.slug === active.slug && itemStyles.active]}
        //onKeyDown={event => { event.keyCode === 13 && this.activateCategory(_c); }}
        //onClick={() => this.activateCategory(_c)}
      >
        <input
          id={_c.slug}
          type="checkbox"
          defaultChecked={this.state[_c.slug]}
          onChange={() => { this.activateCategory(_c) }}
        />
        <label htmlFor={_c.slug} style={[itemStyles.name]}>{_c.cat}</label>
        {/*{'count' in _c && <div style={[itemStyles.count]}>({_c.count})</div>}*/}
      </div>
    )
  }

  renderSidebar() {
    const { categories, active } = this.props;
    const { isMultiColor, isMonoColor } = this.state;
    const itemStyles = styles.container.sidebarWrap.sidebar.categoryItem;

    //if (!active && categories.length) this.props.onActivateCategory(categories[0]);

    return (
      <div style={[styles.container.sidebarWrap]}>
        <div style={[styles.container.sidebarWrap.sidebar]} id="airstore-uploader-categories-box">
          <div style={[styles.container.sidebarWrap.sidebar.colorType]}>
            <div style={[itemStyles]} key="multi-color-wrapper">
              <input
                id="multi-color"
                type="checkbox"
                defaultChecked={isMultiColor}
                onChange={() => { this.setState({ isMultiColor: !isMultiColor }); }}
              />
              <label htmlFor="multi-color" style={[itemStyles.name]}>Multi color</label>
            </div>

            <div style={[itemStyles]} key="mono-color-wrapper">
              <input
                id="mono-color"
                type="checkbox"
                defaultChecked={isMonoColor}
                onChange={() => { this.setState({ isMonoColor: !isMonoColor }); }}
              />
              <label htmlFor="mono-color" style={[itemStyles.name]}>Mono color</label>
            </div>
          </div>

          {/*{this.renderCategory(itemStyles, categories.find(category => category.slug === 'custom-search'), active)}*/}
          {categories && categories
            .filter(category => category.slug !== 'custom-search')
            .sort((a, b) => a.cat > b.cat ? 1 : -1)
            .map(_c => this.renderCategory(itemStyles, _c, active))
          }
        </div>
      </div>
    );
  }

  onLoadImage = (target) => {
    target.style.opacity = 1;
    target.style.background = '#fff';
  }

  toggleTag = (tag) => {
    const { activeTags } = this.state;

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags });

    setTimeout(() => {
      this.search(this.searchField.value);
    });
  }

  renderContent() {
    const { active } = this.props;
    const { height, isUploading, uploadingIcon, isLoading, isSearching } = this.state;
    const contentStyles = styles.container.content;
    const iconStyles = contentStyles.results.icon;
    const searchStyles = styles.search;
    const isEmptyIcons = (!active || !active.icons || !active.icons.length);
    const isSearch = active && active.slug && active.slug === 'custom-search';
    let isVisibleLoadingBlock = true;

    if (active && active.isLastPage) isVisibleLoadingBlock = false;
    if (isSearch && this.searchField && !this.searchField.value) isVisibleLoadingBlock = false;

    return (
      <div
        style={[contentStyles]}
        //onScroll={({target}) => {
        //  if (!isVisibleLoadingBlock) return;
        //
        //  const { scrollTop, scrollHeight, clientHeight } = target;
        //  const scrolledToBottom = scrollHeight < (scrollTop + clientHeight + 100);
        //  if (scrolledToBottom) this.showMore();
        //}}
      >

        <SearchWrapper empty={isEmptyIcons && !isSearching}>
          <SearchTitle show={isEmptyIcons && !isSearching}>You can search icons here</SearchTitle>
          <SearchGroup>
            <InputSearch
              type="search"
              innerRef={node => this.searchField = node}
              autoFocus={true}
              defaultValue={''}
              onKeyDown={ev => isEnterClick(ev) && this.search(this.searchField.value, true)}
            />
            <ButtonSearch onClick={() => this.search(this.searchField.value, true)}>Search</ButtonSearch>
          </SearchGroup>
        </SearchWrapper>

        <TagsWrapper>
          {active.related_tags.map(item => (
            <Tag
              hide={this.searchField.value === item.tag}
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
    onShowMore: (categorySlug, q = '', relevantActiveTags) => dispatch(fetchIcons(categorySlug, q, relevantActiveTags))
  })
)(Radium(IconTab));