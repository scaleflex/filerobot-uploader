var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsTags, activateIconsCategory, fetchIcons } from '../../actions';
import { IconsWrapper, IconTabWrapper, IconMain, IconBoxWrapper, ShowMoreResultsSpinner } from '../../styledComponents';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { IconItem, IconSidebar, SearchBar, IconTags, IconMonoColorSettings, IconAddTagModal } from '../';
import { DEFAULT_ICON_SIZE } from '../../config';
import { setAsNotRelevant, sendSelectionData } from '../../services/iconsApi.service';
import * as ImageGridService from '../../services/imageGrid.service';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';

var IconTab = function (_Component) {
  _inherits(IconTab, _Component);

  function IconTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconTab.__proto__ || Object.getPrototypeOf(IconTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _this.loadedIcons = [], _this.uploadStart = function () {
      return _this.setState({ isLoading: true });
    }, _this.uploadStop = function () {
      return _this.setState({ isLoading: false });
    }, _this.getImageGridWrapperWidth = function () {
      return Math.floor(_this.imageGridWrapperRef.getBoundingClientRect().width - 20);
    }, _this.getImageGridWrapperHeight = function () {
      return _this.imageGridWrapperRef.getBoundingClientRect().height;
    }, _this.updateImageGridColumnWidth = function () {
      var imageGrid = _this.state.imageGrid;
      var minColumnWidth = imageGrid.minColumnWidth,
          gutterSize = imageGrid.gutterSize;

      var imageGridWrapperWidth = _this.getImageGridWrapperWidth();
      var imageContainerHeight = _this.getImageGridWrapperHeight();

      imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

      _this.setState({ imageGridWrapperWidth: imageGridWrapperWidth, imageGrid: imageGrid, imageContainerHeight: imageContainerHeight });
    }, _this.upload = function () {
      var icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.setState({ isLoading: true });
      _this.uploadStart();
      var _this$state = _this.state,
          relevantActiveTags = _this$state.relevantActiveTags,
          searchPhrase = _this$state.searchPhrase,
          activePresetTag = _this$state.activePresetTag;


      sendSelectionData({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, icon.uid, _this.loadedIcons);

      _this.props.onFileUpload(icon.src, _this.props.uploaderConfig).then(function () {
        return _this.uploadStop();
      }, function () {
        return _this.uploadStop();
      });
    }, _this.addTag = function (event, activeIcon) {
      event.stopPropagation();
      _this.setState({ isShowIconAddTagModal: true, activeIcon: activeIcon });
    }, _this.loadIcons = function (searchParams, relevantActiveTags) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var openpixKey = _this.props.uploaderConfig.openpixKey;

      var done = function done(response) {
        typeof cb === 'function' && cb(response);
        _this.setState({ isLoading: false, isShowMoreImages: false });
      };

      _this.setState({ isLoading: !searchParams.offset, isShowMoreImages: searchParams.offset });

      return _this.props.onSearchIcons(_extends({}, searchParams, { openpixKey: openpixKey }), relevantActiveTags, done);
      //.then(done, done);
    }, _this.search = function (_ref2, refreshTags, resizeOnSuccess) {
      var _ref2$value = _ref2.value,
          value = _ref2$value === undefined ? '' : _ref2$value,
          type = _ref2.type,
          _ref2$offset = _ref2.offset,
          offset = _ref2$offset === undefined ? 0 : _ref2$offset;

      var self = _this;
      var related_tags = _this.props.active.related_tags;

      var activeTags = refreshTags ? {} : _this.state.activeTags;
      var relevantActiveTags = _this.getRelevantActiveTags(activeTags, related_tags);
      _this.setState({ isSearching: true, activeTags: activeTags, relevantActiveTags: relevantActiveTags });
      var onSuccess = function onSuccess(response) {
        var _response$payload = response.payload,
            payload = _response$payload === undefined ? {} : _response$payload;
        var _payload$icons = payload.icons,
            icons = _payload$icons === undefined ? [] : _payload$icons;

        if (!icons.length && relevantActiveTags.length) {
          _this.search({ value: value, type: type }, true);
          return;
        } else if (!icons.length) _this.props.showAlert('0 icons was found :(', '', 'warning');

        self.setState({ isSearching: false });
        typeof resizeOnSuccess === 'function' && resizeOnSuccess();
      };

      _this.loadIcons({ value: value, type: type, offset: offset }, relevantActiveTags, onSuccess);
      _this.loadedIcons = [];
    }, _this.onSearch = function () {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var resizeOnSuccess = arguments[1];

      if (!_this.state.searchPhrase && !_this.state.activePresetTag) return;

      _this.setState({ activePresetTag: _this.state.searchPhrase ? null : _this.state.activePresetTag });
      _this.search({
        value: (_this.state.searchPhrase || _this.state.activePresetTag || '').toLowerCase(),
        type: _this.state.activeColorType,
        offset: offset
      }, true, resizeOnSuccess);
    }, _this.getRelevantActiveTags = function (activeTags, related_tags) {
      var result = [];

      var _loop = function _loop(tag) {
        if (activeTags[tag] && related_tags.find(function (item) {
          return item.tag === tag;
        }) && activeTags.hasOwnProperty(tag)) result.push(tag);
      };

      for (var tag in activeTags) {
        _loop(tag);
      }

      return result;
    }, _this.activateCategory = function (_c) {
      var _this$setState;

      _this.setState((_this$setState = {}, _defineProperty(_this$setState, _c.slug, !_this.state[_c.slug]), _defineProperty(_this$setState, 'isSearching', true), _this$setState));
      _this.props.onActivateCategory(_c, function () {
        //const iconBox = document
        //  .querySelector('#airstore-uploader-icons-box .airstore-uploader-icon-item:first-child');
        //if (iconBox) iconBox.focus();
        _this.setState({ isSearching: false });
      });
    }, _this.toggleColorType = function (type) {
      _this.setState({ activeColorType: type });
      var value = (_this.state.searchPhrase || _this.state.activePresetTag || '').toLowerCase();

      if (value) _this.search({ value: value, type: type });
    }, _this.toggleTag = function (tag) {
      var _this$state2 = _this.state,
          activeTags = _this$state2.activeTags,
          activeColorType = _this$state2.activeColorType,
          searchPhrase = _this$state2.searchPhrase,
          activePresetTag = _this$state2.activePresetTag;

      var value = (searchPhrase || activePresetTag || '').toLowerCase();

      activeTags[tag] = !activeTags[tag];
      _this.setState({ activeTags: activeTags });

      setTimeout(function () {
        _this.search({ value: value, type: activeColorType });
      });
    }, _this.onIconClick = function (icon) {
      if (icon.style === 'MONOCOLOR') _this.setState({ activeIcon: icon, activeIconSrc: icon.src, isShowMonoIconSettings: true });else _this.upload(icon);
    }, _this.onChangeSearchPhrase = function (_ref3) {
      var target = _ref3.target;
      _this.setState({ searchPhrase: target.value });
    }, _this.onActivatePresetTag = function (activePresetTag) {
      var activeColorType = _this.state.activeColorType;

      _this.setState({ activePresetTag: activePresetTag, searchPhrase: '' });
      _this.search({ value: activePresetTag, type: activeColorType }, true);
    }, _this.setAsNotRelevant = function (event, activeIcon) {
      var _this$props = _this.props,
          active = _this$props.active,
          showAlert = _this$props.showAlert;
      var _this$state3 = _this.state,
          searchPhrase = _this$state3.searchPhrase,
          activeTags = _this$state3.activeTags,
          activePresetTag = _this$state3.activePresetTag;

      var relevantActiveTags = _this.getRelevantActiveTags(activeTags, active.related_tags);
      event.stopPropagation();
      setAsNotRelevant({ value: searchPhrase || activePresetTag || '' }, relevantActiveTags, activeIcon.uid);
      showAlert('Set icon as not relevant', '', 'info');
    }, _this.onLoadImage = function (target, icon) {
      _this.loadedIcons.push(icon);
    }, _this.onShowMoreImages = function (resizeOnSuccess) {
      if (_this.state.isShowMoreImages) return;

      var _this$props2 = _this.props,
          searchParams = _this$props2.searchParams,
          count = _this$props2.count;


      if (count > searchParams.offset + 250) {
        searchParams.offset = searchParams.offset + 250;
        return _this.onSearch(searchParams.offset, resizeOnSuccess);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onGetTags().then(function () {});
      this.updateImageGridColumnWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.imageGridWrapperRef && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth) this.updateImageGridColumnWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$active = _props.active,
          active = _props$active === undefined ? {} : _props$active,
          uploaderConfig = _props.uploaderConfig,
          showAlert = _props.showAlert,
          count = _props.count;
      var _state = this.state,
          isLoading = _state.isLoading,
          isSearching = _state.isSearching,
          activeTags = _state.activeTags,
          isShowMonoIconSettings = _state.isShowMonoIconSettings,
          activeIconSrc = _state.activeIconSrc,
          searchPhrase = _state.searchPhrase,
          activeColorType = _state.activeColorType,
          isShowIconAddTagModal = _state.isShowIconAddTagModal,
          activeIcon = _state.activeIcon,
          activePresetTag = _state.activePresetTag,
          imageGridWrapperWidth = _state.imageGridWrapperWidth,
          imageContainerHeight = _state.imageContainerHeight,
          imageGrid = _state.imageGrid,
          isShowMoreImages = _state.isShowMoreImages;
      var columnWidth = imageGrid.columnWidth,
          gutterSize = imageGrid.gutterSize;

      var isSearch = active && active.slug && active.slug === 'custom-search';
      var isVisibleLoadingBlock = !(active && active.isLastPage || isSearch && !this.state.searchPhrase);

      return React.createElement(
        IconTabWrapper,
        null,
        React.createElement(IconSidebar, {
          activePresetTag: activePresetTag,
          onActivatePresetTag: this.onActivatePresetTag,
          toggleColorType: this.toggleColorType,
          activeColorType: activeColorType
        }),
        React.createElement(
          IconMain,
          null,
          React.createElement(SearchBar, {
            title: "You can search icons here",
            items: active.icons,
            isLoading: isLoading,
            onSearch: function onSearch() {
              _this2.onSearch();
            },
            isSearching: isSearching,
            searchPhrase: searchPhrase,
            onChangeSearchPhrase: this.onChangeSearchPhrase,
            count: count
          }),
          React.createElement(IconTags, {
            tagsList: active.related_tags,
            searchPhrase: searchPhrase,
            activeTags: activeTags,
            toggleTag: this.toggleTag
          }),
          isShowMonoIconSettings && React.createElement(IconMonoColorSettings, {
            upload: this.upload,
            activeIconSrc: activeIconSrc,
            onClose: function onClose() {
              _this2.setState({ isShowMonoIconSettings: false });
            }
          }),
          isShowIconAddTagModal && React.createElement(IconAddTagModal, {
            isShowIconAddTagModal: isShowIconAddTagModal,
            activeIcon: activeIcon,
            upload: this.upload,
            showAlert: showAlert,
            activeIconSrc: activeIconSrc,
            isShowMonoIconSettings: isShowMonoIconSettings,
            onClose: function onClose() {
              _this2.setState({ isShowIconAddTagModal: false });
            }
          }),
          React.createElement(
            IconsWrapper,
            {
              innerRef: function innerRef(node) {
                return _this2.imageGridWrapperRef = node;
              },
              id: 'airstore-uploader-icons-box'
            },
            active.icons.length && !isLoading && columnWidth ? React.createElement(VirtualizedImagesGrid, {
              imageGridWrapperWidth: imageGridWrapperWidth,
              imageContainerHeight: imageContainerHeight,
              columnWidth: columnWidth,
              gutterSize: gutterSize,
              count: active.icons.length,
              list: active.icons,
              upload: this.upload,
              onShowMoreImages: this.onShowMoreImages,
              isShowMoreImages: isShowMoreImages,
              cellContent: function cellContent(_ref4) {
                var style = _ref4.style,
                    columnWidth = _ref4.columnWidth,
                    item = _ref4.item,
                    index = _ref4.index;
                return React.createElement(
                  IconBoxWrapper,
                  { style: _extends({}, style, { width: Math.floor(columnWidth) }) },
                  React.createElement(IconItem, {
                    columnWidth: Math.floor(columnWidth),
                    icon: item,
                    index: index,
                    onIconClick: _this2.onIconClick,
                    upload: _this2.upload,
                    addTag: _this2.addTag,
                    isShowAddTagBtn: uploaderConfig.isShowAddTagBtn,
                    isShowNotRelevantBtn: uploaderConfig.isShowNotRelevantBtn,
                    setAsNotRelevant: _this2.setAsNotRelevant,
                    onLoadImage: _this2.onLoadImage
                  })
                );
              }
            }) : null,
            React.createElement(ShowMoreResultsSpinner, { show: isShowMoreImages && active.icons.length })
          ),
          React.createElement(Spinner, { overlay: true, show: isLoading })
        )
      );
    }
  }]);

  return IconTab;
}(Component);

export default connect(function (_ref5) {
  var uploaderConfig = _ref5.uploader.uploaderConfig,
      _ref5$icons = _ref5.icons,
      tags = _ref5$icons.tags,
      active = _ref5$icons.active,
      searchParams = _ref5$icons.searchParams,
      count = _ref5$icons.count;
  return { uploaderConfig: uploaderConfig, tags: tags, active: active, count: count, searchParams: searchParams };
}, function (dispatch) {
  return {
    onGetTags: function onGetTags() {
      return dispatch(getIconsTags());
    },
    onActivateCategory: function onActivateCategory(category, onSuccess) {
      return dispatch(activateIconsCategory(category, onSuccess));
    },
    onFileUpload: function onFileUpload(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    },
    onSearchIcons: function onSearchIcons(searchParams, relevantActiveTags, done) {
      return dispatch(fetchIcons(searchParams, relevantActiveTags, done));
    }
  };
})(IconTab);