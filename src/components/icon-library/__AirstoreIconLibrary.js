import React, { Component } from 'react';
import Radium from 'radium';
import styles from './styles.css';
import { getCategories, getCategoryIcons, searchIcons } from './api.service';
import { cursorToEnd } from '../../utils';
import {connect} from "react-redux";
import {uploadFilesFromUrls} from "../../actions";

const ICONS_PER_PAGE_LIMIT = 36; // limit filter for icons requests

class __AirstoreIconLibrary extends Component {
  state = {
    iconHeight: 'auto',
    active: null,
    file: null,
    uploadedFile: null,
    isSidebarLoading: true,
    isIconsLoading: false,
    isShowMoreLoading: false,
    isIconUploading: false,
    searchQuery: '',
    categories: [
      {
        slug: 'custom-famous',
        cat: 'Famous'
      },
      {
        slug: 'custom-search',
        cat: 'Search',
        count: 0
      }
    ]
  };

  _tmp = {
    iconsHeights: [],
    searchTimeoutId: null
  }

  constructor() {
    super();

    getCategories().then(
      categories => {
        this.setState({ isSidebarLoading: false, categories: [...this.state.categories, ...categories] });

        setTimeout(() => { this.activateCategory(this.state.categories[0]) });
      }
    );
  }

  isFileValid = file => true;

  selectIcon = (icon) => {
    const file = icon.src;

    this.setState({ file });
    setTimeout(() => {
      if (file && this.isFileValid(file)) this.upload();
    });
  };

  uploadStart = () => this.setState({ isIconUploading: true });
  uploadSuccess = uploadedFiles => this.setState({ uploadedFile: uploadedFiles[0], isIconUploading: false });
  uploadError = () => this.setState({ uploadedFile: null, isIconUploading: false });

  upload = () => {
    if (this.state.isIconUploading) return;

    this.uploadStart();
    this.props.onFileUpload(this.state.file, this.props.uploaderConfig)
      .then(files => this.uploadSuccess(files), () => this.uploadError());
  };

  // upload = () => {
  //   if (typeof this.props.onUploaded === 'function') {
  //     this.setState({ isIconUploading: true });
  //
  //     this.props.onUploaded([this.state.file], 'files_url[]').then(
  //       (uploadedFiles = []) => {
  //         if (uploadedFiles === false)
  //           return;
  //
  //         this.setState({ uploadedFile: uploadedFiles[0], isIconUploading: false });
  //       },
  //       (error) => {
  //         console.warn(error.msg || 'Upload icon error!');
  //         this.setState({ isIconUploading: false });
  //       }
  //     );
  //   }
  //   else
  //     console.warn('this.props.onUploaded is not defined (AirstoreIconLibrary)');
  // }

  activateCategory = (active = {}) => {
    this.setState({ active, isIconsLoading: false });

    setTimeout(() => {
      // scroll top
      this.refs.contentBlock.scrollTop = 0;

      // search field autofocus
      if (active.slug === 'custom-search') {
        const field = this.refs.searchField;
        const { value } = field;

        field.value = '';
        field.focus();
        field.value = value;
      }

      // When we switch to "custom-search" and some icons is already loaded we don't need make a load request.
      if (!(active.slug === 'custom-search' && active.loaderInfo && active.loaderInfo.page))
        this.loadIcons(active);
    });
  }

  loadIcons = (_category, showMore = false) => {
    const { categories } = this.state;
    const category = categories.find(c => c.slug === _category.slug);
    const loadingStartFn = () => {
      this.setState({ isIconsLoading: true, isShowMoreLoading: showMore });
    };
    const successHandlerFn = ({icons = [], count = 0}) => {
      Object.assign(category, { count, icons: [...(category.icons || []), ...icons] });

      // specific implementation for custom-search. redefine "icons" if new search
      if (category.slug === 'custom-search' && !showMore)
        Object.assign(category, { icons });

      category.loaderInfo.allShown = category.loaderInfo.page * ICONS_PER_PAGE_LIMIT >= count;

      this.setState({ categories, isIconsLoading: false, isShowMoreLoading: false });
    };

    if (!category) {
      console.warn('Something goes wrong! Can\'t find icon category in list!');
      return;
    }

    // Need to load icons in 2 cases:
    // 1. It's initial load (1st time open category)
    // 2. showMore === TRUE
    if (category.loaderInfo && category.loaderInfo.page && !showMore && category.slug !== 'custom-search')
      return;

    // set default loaderInfo
    category.loaderInfo = category.loaderInfo || { page: showMore ? 0 : 1, allShown: false };

    // we don't need to make request if all icons is shown
    if (showMore && category.loaderInfo.allShown)
      return;

    if (showMore)
      category.loaderInfo.page++;

    switch (category.slug) {
      case 'custom-famous':
        loadingStartFn();
        searchIcons(category.loaderInfo.page, '', ICONS_PER_PAGE_LIMIT).then(successHandlerFn);
        break;

      case 'custom-search':
        const { searchQuery } = this.state;

        // set default
        if (!category.loaderInfo.hasOwnProperty('searchQuery') || category.loaderInfo.searchQuery !== searchQuery)
          category.loaderInfo = {...category.loaderInfo, searchQuery, page: 1 };

        loadingStartFn();

        if (!searchQuery)
          successHandlerFn({ count: 0, icons: [] });
        else
          searchIcons(category.loaderInfo.page, searchQuery, ICONS_PER_PAGE_LIMIT).then(successHandlerFn);

        break;

      default:
        loadingStartFn();
        getCategoryIcons(category.slug, category.loaderInfo.page, ICONS_PER_PAGE_LIMIT).then(successHandlerFn);
    }
  }

  showMoreIcons = () => {
    const { active, isIconsLoading } = this.state;

    if (!isIconsLoading && active)
      this.loadIcons(active, true);
  }

  iconImageErrorHandler = (icon, { target }) => {
    target.parentElement.parentElement.style.display = 'none';
  }

  iconImageLoadHandler = ({ target }) => {
    if (isFinite(this.state.iconHeight) && this.state.iconHeight !== null)
      return;

    const rect = target.parentElement.parentElement.getBoundingClientRect();
    const { height = 0 } = rect;
    const counter = {};
    let resultHeight = 0;

    if (height)
      this._tmp.iconsHeights.push(rect.height);

    this._tmp.iconsHeights.forEach(height => {
      if (!counter.hasOwnProperty(height))
        counter[height] = 0;

      counter[height]++;
    });


    if (this._tmp.iconsHeights.length === 10)
      resultHeight = (() => {
        let _height = null;

        for (let _h in counter)
          if (!_height || counter[_h] > counter[_height])
            _height = _h;

        return _height;
      })();

    if (resultHeight)
      this.setState({ iconHeight: resultHeight });
  }

  changeSearchFieldHandler = ({target}) => {
    if (this._tmp.searchTimeoutId)
      clearTimeout(this._tmp.searchTimeoutId);

    this._tmp.searchTimeoutId = setTimeout(() => {
      this.setState({ searchQuery: target.value });
      setTimeout(() => { this.loadIcons(this.state.active) })
    }, 600);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={[styles.container]}>
        {this.renderSidebar()}
        {this.renderContent()}
      </div>
    );
  }


  renderSidebar() {
    const { categories, active, isSidebarLoading } = this.state;
    const { sidebar } = styles.container;

    return (
      <div style={[styles.col2, sidebar]}>
        <div style={[sidebar.list]}>
          {categories.map(category => {
            const isActive = active && active.slug === category.slug;

            return (
              <a
                key={category.slug}
                style={[sidebar.list.item, isActive ? sidebar.list.item.active : sidebar.list.item.notActive]}
                onClick={event => {
                  event.preventDefault();
                  this.activateCategory(category);
                }}
              >
                {category.cat} {"count" in category && <j-span
                  style={[styles.badge, isActive && styles.badge.active]}>{category.count}</j-span>
                }
              </a>
            );
          })}

          {
            isSidebarLoading &&
            <div style={[{ textAlign: 'center' }]}>
              <j-i style={[styles.fa, styles.faSpin]}>&#61712;</j-i>
            </div>
          }
        </div>
      </div>
    );
  }

  renderContent() {
    const { active, isIconsLoading, isShowMoreLoading, iconHeight, isIconUploading } = this.state;
    const { content } = styles.container;
    const { gridContainer } = content.container;

    return (
      <div
        ref="contentBlock"
        style={[styles.col10, content]}
        onScroll={({ target }) => {
          const { scrollTop, scrollHeight, clientHeight } = target;
          const scrolledToBottom = scrollHeight ===  scrollTop + clientHeight;

          if (scrolledToBottom)
            this.showMoreIcons();
        }}
      >
        {
          active &&
          <div key={`content-${active.slug}`} style={[content.container]}>

            {active.slug === 'custom-search' && this.renderCustomSearchBlock()}


            <div style={[gridContainer]}>
              {
                ((!isIconsLoading && !isShowMoreLoading) || (isIconsLoading && isShowMoreLoading)) && (active.icons || []).map((icon, index) => (
                  <j-span
                    key={`icon-${index}`}
                    style={[
                      gridContainer.itemContainer,
                      { width: '16.66%', height: iconHeight + (isFinite(iconHeight) ? 'px' : '') }
                    ]}
                    onClick={this.selectIcon.bind(this, icon)}
                  >
                    <div style={[gridContainer.itemContainer.item]}>
                      <img
                        style={[gridContainer.itemContainer.item.img]}
                        src={icon.src}
                        onError={this.iconImageErrorHandler.bind(this, icon)}
                        onLoad={this.iconImageLoadHandler}
                      />

                      <j-button
                        key={`btn-${index}`}
                        style={[gridContainer.itemContainer.item.button]}
                      >
                        {
                          Radium.getState(this.state, `btn-${index}`, ':hover') &&
                          <j-span style={[gridContainer.itemContainer.item.button.overlay]}>{icon.desc}</j-span>
                        }
                      </j-button>
                    </div>
                  </j-span>
                ))
              }
            </div>

            {
              isIconsLoading &&
              <div style={[{ textAlign: 'center' }]}>
                <j-i
                  style={[styles.fa, styles.faSpin, {
                    color: '#a9a9a9',
                    font: 'normal normal normal 35px/1 FontAwesome'
                  }]}
                >&#61712;</j-i>
              </div>
            }

            {isIconUploading && <div style={[styles.container.content.container.gridOverlay]}></div>}
          </div>
        }
      </div>
    );
  }

  renderCustomSearchBlock() {
    const { searchBlock } = styles.container.content.container;
    const { fieldContainer } = searchBlock.container;

    return (
      <div style={[searchBlock]}>
        <div style={[searchBlock.container]}>

          <div style={[fieldContainer]}>
            <j-i
              style={[
                styles.fa,
                fieldContainer.icon,
                Radium.getState(this.state, 'search-field', ':focus') && { color: 'grey' }
              ]}
            >&#61442;</j-i>

            <input
              ref="searchField"
              type="search"
              key="search-field"
              style={[styles.formControl, fieldContainer.field]}
              onChange={this.changeSearchFieldHandler}
              defaultValue={this.state.searchQuery}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  ({uploader: {uploaderConfig}}) => ({uploaderConfig}),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig))
  })
)(Radium(__AirstoreIconLibrary));