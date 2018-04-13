import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, IconsCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons } from '../actions';
import { isEnterClick } from '../utils/index';
import {
  SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, TagsWrapper, Tag, CloseIcon,
  SidebarWrap, SideBar, ColorType, ColorItem, ColorItemName, ActiveItem, AmountIcons, Label, MonoIconSettings,
  ColorIcon, ColorsWrapper, ControlIcon, Opacity
} from '../styledComponents';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { IconItem } from './';


const colors = [
  'red',
  'yellow',
  'black',
  'green',
  'grey',
  'brown',
  'grey',
  'purple'
];

class IconTab extends Component {
  state = {
    height: '114px',
    isLoading: false,
    isUploading: false,
    uploadingIcon: null,
    isSearching: false,
    activeColorType: 'multi',
    isHover: false,
    isShowMonoIconSettings: false,

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

  onSearch = () => {
    this.search({ value: (this.searchField.value || '').toLowerCase(), type: this.state.activeColorType }, true)
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
    if (!this.searchField) return;

    this.setState({ activeColorType: type });
    const value = (this.searchField.value || '').toLowerCase();

    if (value)
      this.search({ value, type });
  }

  toggleTag = (tag) => {
    const { activeTags, activeColorType } = this.state;
    const value = (this.searchField.value || '').toLowerCase();

    activeTags[tag] = !activeTags[tag];
    this.setState({ activeTags });

    setTimeout(() => {
      this.search({ value, type: activeColorType });
    });
  };

  onIconClick = (src) => {
    const { activeColorType } = this.state;

    if (activeColorType === 'mono')
      this.setState({ activeIconSrc: src, isShowMonoIconSettings: true });
    else
      this.upload(src);
  };

  hoverToggle(name, isHover) { this.setState({ [name]: isHover }) }

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
    const { isUploading, uploadingIcon, isLoading, isSearching, activeColorType, isShowMonoIconSettings, activeIconSrc } = this.state;
    const contentStyles = styles.container.content;
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
              onKeyDown={ev => { isEnterClick(ev) && this.onSearch() }}
            />
            <ButtonSearch
              onClick={this.onSearch}
            >Search</ButtonSearch>
          </SearchGroup>

          <AmountIcons empty={isEmptyIcons}>
            <Label>Found:</Label>
            {active.icons.length}
          </AmountIcons>
        </SearchWrapper>



        {(active && active.related_tags.length > 0) && this.searchField &&
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
        </TagsWrapper>}

        <Opacity isShow={isShowMonoIconSettings}/>

        <MonoIconSettings isShow={isShowMonoIconSettings}>
          <ControlIcon fs={100} color={'purple'} pb={20} className={'sfi-airstore-image'}/>
          <Label color={'bl'}>Customize your icon</Label>
          <ColorsWrapper>
            {colors.map((color, index) => <ColorIcon bgColor={color} key={`color-${index}`}> </ColorIcon>)}
          </ColorsWrapper>
          <ButtonSearch fullBr={'4px'} onClick={this.upload.bind(this, activeIconSrc)}>Apply</ButtonSearch>
        </MonoIconSettings>

        {active && active.icons &&
        <div
          style={[contentStyles.results]}
          id="airstore-uploader-icons-box"
          ref={node => this._iconsWrapper = node}
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
            />
          ))}
        </div>
        }
        <Spinner overlay show={isVisibleLoadingBlock && isLoading}/>
      </div>
    );
  }
}

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