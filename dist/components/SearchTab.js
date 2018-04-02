var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium from 'radium';
import { uploadFilesFromUrls, searchImages } from '../actions';
import { connect } from 'react-redux';
import { isEnterClick } from '../utils/index';
import { CSS, SearchCss as styles } from '../assets/styles';

var SearchTab = function (_Component) {
  _inherits(SearchTab, _Component);

  function SearchTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchTab.__proto__ || Object.getPrototypeOf(SearchTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isLoading: false, uploadingUuid: null, isSearching: false }, _this.uploadStart = function (uuid) {
      return _this.setState({ uploadingUuid: uuid, isLoading: true });
    }, _this.uploadStop = function () {
      return _this.setState({ uploadingUuid: null, isLoading: false });
    }, _this.upload = function (url) {
      if (_this.state.isLoading) return;

      _this.uploadStart(url);
      _this.props.onFileUpload(url, _this.props.uploaderConfig).then(function () {
        return _this.uploadStop();
      }, function () {
        return _this.uploadStop();
      });
    }, _this.search = function () {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!q) return;
      var done = function done() {
        return _this.setState({ isSearching: false });
      };

      _this.setState({ isSearching: true });
      _this.props.onSearchImages(q).then(done, done);
    }, _this.onKeyDown = function (event, original_url) {
      if (event.keyCode === 13) {
        event.preventDefault();
        event.stopPropagation();

        _this.upload(original_url);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchTab, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isSearching = this.state.isSearching;
      var _props = this.props,
          query = _props.query,
          _props$images = _props.images,
          images = _props$images === undefined ? [] : _props$images;


      return React.createElement(
        'div',
        { style: [styles.container, !images.length && styles.container.empty] },
        !images.length && React.createElement(
          'h3',
          { style: [styles.container.title] },
          'You can search images here'
        ),
        React.createElement(
          'div',
          { style: [styles.container.searchBlock] },
          React.createElement('input', {
            style: [CSS.field],
            type: 'search',
            ref: 'searchField',
            placeholder: 'e.g. nature',
            autoFocus: true,
            defaultValue: query || '',
            onKeyDown: function onKeyDown(ev) {
              return isEnterClick(ev) && _this2.search(_this2.refs.searchField.value);
            }
          }),
          React.createElement(
            'button',
            { style: [CSS.button], onClick: function onClick() {
                return _this2.search(_this2.refs.searchField.value);
              } },
            isSearching ? 'Searching..' : 'Search'
          )
        ),
        images && this.renderResults()
      );
    }
  }, {
    key: 'renderResults',
    value: function renderResults() {
      var _this3 = this;

      var _state = this.state,
          isLoading = _state.isLoading,
          uploadingUuid = _state.uploadingUuid;
      var _props2 = this.props,
          _props2$images = _props2.images,
          images = _props2$images === undefined ? [] : _props2$images,
          query = _props2.query;

      var resultStyles = styles.container.resultBlock;

      return React.createElement(
        'div',
        { style: [resultStyles] },
        images.map(function (image, index) {
          return React.createElement(
            'div',
            {
              style: [resultStyles.item, isLoading && uploadingUuid === image.original_url && resultStyles.item.loading.active, isLoading && uploadingUuid !== image.original_url && resultStyles.item.loading.notActive],
              key: 'image-' + image.original_url,
              onKeyDown: function onKeyDown(event) {
                return _this3.onKeyDown(event, image.original_url);
              },
              onClick: _this3.upload.bind(_this3, image.original_url),
              tabIndex: 1
            },
            React.createElement('span', { style: [resultStyles.item.alignmentBlock] }),
            React.createElement('img', {
              style: resultStyles.item.img,
              src: image.thumb_url,
              alt: image.alt || query + ' ' + (index + 1),
              width: '100%',
              height: 'auto'
            })
          );
        })
      );
    }
  }]);

  return SearchTab;
}(Component);

export default connect(function (_ref2) {
  var uploaderConfig = _ref2.uploader.uploaderConfig,
      _ref2$search = _ref2.search,
      query = _ref2$search.query,
      images = _ref2$search.images;
  return { uploaderConfig: uploaderConfig, query: query, images: images };
}, function (dispatch) {
  return {
    onFileUpload: function onFileUpload(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    },
    onSearchImages: function onSearchImages() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return dispatch(searchImages(q));
    }
  };
})(Radium(SearchTab));