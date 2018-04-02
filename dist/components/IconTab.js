var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, IconsCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons } from '../actions';
import { isEnterClick } from '../utils/index';

var IconTab = function (_Component) {
  _inherits(IconTab, _Component);

  function IconTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconTab.__proto__ || Object.getPrototypeOf(IconTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = { height: '114px', isLoading: false, isUploading: false, uploadingIcon: null, isSearching: false }, _this.uploadStart = function (url) {
      return _this.setState({ uploadingIcon: url, isUploading: true });
    }, _this.uploadStop = function () {
      return _this.setState({ uploadingIcon: null, isUploading: false });
    }, _this.upload = function () {
      var iconUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (_this.state.isUploading) return;

      _this.uploadStart(iconUrl);
      _this.props.onFileUpload(iconUrl, _this.props.uploaderConfig).then(function () {
        return _this.uploadStop();
      }, function () {
        return _this.uploadStop();
      });
    }, _this.loadIcons = function (slug) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var done = function done() {
        _this.setState({ isLoading: false });
        typeof cb === 'function' && cb();
      };

      _this.setState({ isLoading: true });
      setTimeout(function () {
        return _this.props.onShowMore(slug, +page, q).then(done, done);
      });
    }, _this.showMore = function () {
      if (_this.state.isLoading) return;
      var _this$props$active = _this.props.active,
          slug = _this$props$active.slug,
          _this$props$active$pa = _this$props$active.page,
          page = _this$props$active$pa === undefined ? 0 : _this$props$active$pa,
          _this$props$active$q = _this$props$active.q,
          q = _this$props$active$q === undefined ? '' : _this$props$active$q;


      _this.loadIcons(slug, page + 1, q);
    }, _this.search = function () {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var slug = _this.props.active.slug;


      _this.setState({ isSearching: true });
      _this.loadIcons(slug, 1, q, function () {
        return _this.setState({ isSearching: false });
      });
    }, _this.activateCategory = function (_c) {
      _this.props.onActivateCategory(_c, function () {
        var iconBox = document.querySelector('#airstore-uploader-icons-box .airstore-uploader-icon-item:first-child');
        if (iconBox) iconBox.focus();
      });
    }, _this.renderCategory = function (itemStyles, _c, active) {
      return React.createElement(
        'div',
        {
          key: 'category-' + _c.slug,
          tabIndex: 0,
          className: 'airstore-uploader-category-item',
          style: [itemStyles, active && _c.slug === active.slug && itemStyles.active],
          onKeyDown: function onKeyDown(event) {
            event.keyCode === 13 && _this.activateCategory(_c);
          },
          onClick: function onClick() {
            return _this.activateCategory(_c);
          }
        },
        React.createElement(
          'div',
          { style: [itemStyles.name] },
          _c.cat
        ),
        'count' in _c && React.createElement(
          'div',
          { style: [itemStyles.count] },
          '(',
          _c.count,
          ')'
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onGetCategories().then(function () {
        setTimeout(function () {
          var iconBox = document.querySelector('#airstore-uploader-categories-box .airstore-uploader-category-item:nth-child(2)');

          if (iconBox) iconBox.focus();
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.props.active;


      return React.createElement(
        'div',
        { style: [styles.container] },
        this.renderSidebar(),
        active && this.renderContent()
      );
    }
  }, {
    key: 'renderSidebar',
    value: function renderSidebar() {
      var _this2 = this;

      var _props = this.props,
          categories = _props.categories,
          active = _props.active;

      var itemStyles = styles.container.sidebarWrap.sidebar.categoryItem;

      if (!active && categories.length) this.props.onActivateCategory(categories[0]);

      return React.createElement(
        'div',
        { style: [styles.container.sidebarWrap] },
        React.createElement(
          'div',
          { style: [styles.container.sidebarWrap.sidebar], id: 'airstore-uploader-categories-box' },
          this.renderCategory(itemStyles, categories.find(function (category) {
            return category.slug === 'custom-search';
          }), active),
          categories && categories.filter(function (category) {
            return category.slug !== 'custom-search';
          }).sort(function (a, b) {
            return a.cat > b.cat ? 1 : -1;
          }).map(function (_c) {
            return _this2.renderCategory(itemStyles, _c, active);
          })
        )
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _this3 = this;

      var active = this.props.active;
      var _state = this.state,
          height = _state.height,
          isUploading = _state.isUploading,
          uploadingIcon = _state.uploadingIcon,
          isLoading = _state.isLoading,
          isSearching = _state.isSearching;

      var contentStyles = styles.container.content;
      var iconStyles = contentStyles.results.icon;
      var searchStyles = styles.search;
      var isEmptyIcons = !active || !active.icons || !active.icons.length;
      var isSearch = active && active.slug && active.slug === 'custom-search';
      var isVisibleLoadingBlock = true;

      if (active && active.isLastPage) isVisibleLoadingBlock = false;
      if (isSearch && this.refs.searchField && !this.refs.searchField.value) isVisibleLoadingBlock = false;

      return React.createElement(
        'div',
        {
          style: [contentStyles],
          onScroll: function onScroll(_ref2) {
            var target = _ref2.target;

            if (!isVisibleLoadingBlock) return;

            var scrollTop = target.scrollTop,
                scrollHeight = target.scrollHeight,
                clientHeight = target.clientHeight;

            var scrolledToBottom = scrollHeight < scrollTop + clientHeight + 100;
            if (scrolledToBottom) _this3.showMore();
          }
        },
        isSearch && React.createElement(
          'div',
          { style: [searchStyles, isEmptyIcons && searchStyles.empty] },
          isEmptyIcons && React.createElement(
            'h3',
            { style: [searchStyles.title] },
            'You can search icons here'
          ),
          React.createElement(
            'div',
            { style: [searchStyles.searchBlock] },
            React.createElement('input', {
              style: [CSS.field],
              type: 'search',
              ref: 'searchField',
              autoFocus: true,
              defaultValue: '',
              onKeyDown: function onKeyDown(ev) {
                return isEnterClick(ev) && _this3.search(_this3.refs.searchField.value);
              }
            }),
            React.createElement(
              'button',
              { style: [CSS.button], onClick: function onClick() {
                  return _this3.search(_this3.refs.searchField.value);
                } },
              isSearching ? 'Searching...' : 'Search'
            )
          )
        ),
        React.createElement(
          'div',
          { style: [contentStyles.results], id: 'airstore-uploader-icons-box', ref: function ref(node) {
              return _this3._iconsWrapper = node;
            } },
          active && active.icons && active.icons.map(function (icon, index) {
            return React.createElement(
              'div',
              {
                key: 'icon-' + icon.desc + '-' + index,
                className: 'airstore-uploader-icon-item',
                style: [iconStyles, { height: height }, isUploading && uploadingIcon === icon.src && iconStyles.loading.active, isUploading && uploadingIcon !== icon.src && iconStyles.loading.notActive],
                onClick: _this3.upload.bind(_this3, icon.src),
                onKeyDown: function onKeyDown(event) {
                  event.keyCode === 13 && _this3.upload(icon.src);
                },
                tabIndex: 0
              },
              React.createElement(
                'div',
                { style: [iconStyles.imageWrap] },
                React.createElement('img', {
                  src: icon.src,
                  width: '100%',
                  height: '100%',
                  alt: icon.desc,
                  onLoad: function onLoad(_ref3) {
                    var width = _ref3.target.width;
                    if (width && width !== height) _this3.setState({ height: width + 'px' });
                  }
                })
              )
            );
          })
        ),
        isVisibleLoadingBlock && React.createElement(
          'div',
          { style: [contentStyles.loading, !isLoading && { visibility: 'hidden' }] },
          'Loading...'
        )
      );
    }
  }]);

  return IconTab;
}(Component);

export default connect(function (_ref4) {
  var uploaderConfig = _ref4.uploader.uploaderConfig,
      _ref4$icons = _ref4.icons,
      categories = _ref4$icons.categories,
      active = _ref4$icons.active;
  return { uploaderConfig: uploaderConfig, categories: categories, active: active };
}, function (dispatch) {
  return {
    onGetCategories: function onGetCategories() {
      return dispatch(getIconsCategories());
    },
    onActivateCategory: function onActivateCategory(category, onSuccess) {
      return dispatch(activateIconsCategory(category, onSuccess));
    },
    onFileUpload: function onFileUpload(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    },
    onShowMore: function onShowMore(categorySlug) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return dispatch(fetchIcons(categorySlug, page, q));
    }
  };
})(Radium(IconTab));