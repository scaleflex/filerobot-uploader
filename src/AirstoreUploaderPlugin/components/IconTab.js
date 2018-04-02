import React, { Component } from 'react';
import Radium from 'radium';
import {CSS, IconsCss as styles} from '../assets/styles';
import {connect} from "react-redux";
import {uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons} from '../actions';
import {isEnterClick} from '../utils/index';

class IconTab extends Component {
  state = { height: '114px', isLoading: false, isUploading: false, uploadingIcon: null, isSearching: false };

  componentDidMount() {
    this.props.onGetCategories().then(() => {
      setTimeout(() => {
        const iconBox = document
          .querySelector('#airstore-uploader-categories-box .airstore-uploader-category-item:nth-child(2)');

        if (iconBox) iconBox.focus();
      })
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

  loadIcons = (slug, page = 0, q = '', cb = null) => {
    const done = () => {
      this.setState({isLoading: false});
      typeof cb === 'function' && cb();
    };

    this.setState({isLoading: true});
    setTimeout(() => this.props.onShowMore(slug, +page, q).then(done, done));
  };

  showMore = () => {
    if (this.state.isLoading) return;
    const {slug, page = 0, q = ''} = this.props.active;

    this.loadIcons(slug, page + 1, q);
  };

  search = (q = '') => {
    const {slug} = this.props.active;

    this.setState({isSearching: true});
    this.loadIcons(slug, 1, q, () => this.setState({isSearching: false}));
  };

  activateCategory = (_c) => {
    this.props.onActivateCategory(_c, () => {
      const iconBox = document
        .querySelector('#airstore-uploader-icons-box .airstore-uploader-icon-item:first-child');
      if (iconBox) iconBox.focus();
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
        tabIndex={0}
        className="airstore-uploader-category-item"
        style={[itemStyles, active && _c.slug === active.slug && itemStyles.active]}
        onKeyDown={event => { event.keyCode === 13 && this.activateCategory(_c); }}
        onClick={() => this.activateCategory(_c)}
      >
        <div style={[itemStyles.name]}>{_c.cat}</div>
        {'count' in _c && <div style={[itemStyles.count]}>({_c.count})</div>}
      </div>
    )
  }

  renderSidebar() {
    const { categories, active } = this.props;
    const itemStyles = styles.container.sidebarWrap.sidebar.categoryItem;

    if (!active && categories.length) this.props.onActivateCategory(categories[0]);

    return (
      <div style={[styles.container.sidebarWrap]}>
        <div style={[styles.container.sidebarWrap.sidebar]} id="airstore-uploader-categories-box">
          {this.renderCategory(itemStyles, categories.find(category => category.slug === 'custom-search'), active)}
          {categories && categories
            .filter(category => category.slug !== 'custom-search')
            .sort((a, b) => a.cat > b.cat ? 1 : -1)
            .map(_c => this.renderCategory(itemStyles, _c, active))
          }
        </div>
      </div>
    );
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
    if (isSearch && this.refs.searchField && !this.refs.searchField.value) isVisibleLoadingBlock = false;

    return (
      <div
        style={[contentStyles]}
        onScroll={({target}) => {
          if (!isVisibleLoadingBlock) return;

          const { scrollTop, scrollHeight, clientHeight } = target;
          const scrolledToBottom = scrollHeight < (scrollTop + clientHeight + 100);
          if (scrolledToBottom) this.showMore();
        }}
      >

        {isSearch &&
          <div style={[searchStyles, isEmptyIcons && searchStyles.empty]}>
            {isEmptyIcons && <h3 style={[searchStyles.title]}>You can search icons here</h3>}

            <div style={[searchStyles.searchBlock]}>
              <input
                style={[CSS.field]}
                type="search"
                ref="searchField"
                autoFocus={true}
                defaultValue={''}
                onKeyDown={ev => isEnterClick(ev) && this.search(this.refs.searchField.value)}
              />

              <button style={[CSS.button]} onClick={() => this.search(this.refs.searchField.value)}>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        }


        <div style={[contentStyles.results]} id="airstore-uploader-icons-box" ref={node => this._iconsWrapper = node}>
          {active && active.icons &&
            active.icons.map((icon, index) =>
              <div
                key={`icon-${icon.desc}-${index}`}
                className="airstore-uploader-icon-item"
                style={[
                  iconStyles, {height},
                  isUploading && uploadingIcon === icon.src && iconStyles.loading.active,
                  isUploading && uploadingIcon !== icon.src && iconStyles.loading.notActive
                ]}
                onClick={this.upload.bind(this, icon.src)}
                onKeyDown={event => { event.keyCode === 13 && this.upload(icon.src) }}
                tabIndex={0}
              >
                <div style={[iconStyles.imageWrap]}>
                  <img
                    src={icon.src}
                    width="100%"
                    height="100%"
                    alt={icon.desc}
                    onLoad={({target: {width}}) => {if (width && width !== height) this.setState({height: `${width}px`})}}
                  />
                </div>
              </div>
            )
          }
        </div>

        {isVisibleLoadingBlock &&
          <div style={[contentStyles.loading, !isLoading && {visibility: 'hidden'}]}>Loading...</div>
        }
      </div>
    );
  }
}

export default connect(
  ({uploader: {uploaderConfig}, icons: {categories, active}}) =>
    ({uploaderConfig, categories, active}),
  dispatch => ({
    onGetCategories: () => dispatch(getIconsCategories()),
    onActivateCategory: (category, onSuccess) => dispatch(activateIconsCategory(category, onSuccess)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onShowMore: (categorySlug, page = 1, q = '') => dispatch(fetchIcons(categorySlug, page, q))
  })
)(Radium(IconTab));