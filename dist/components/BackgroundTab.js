var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, BgCss as styles } from '../assets/styles';
import { getBackgrounds, uploadFilesFromUrls } from '../actions';
import { connect } from 'react-redux';

var BackgroundTab = function (_Component) {
  _inherits(BackgroundTab, _Component);

  function BackgroundTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BackgroundTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BackgroundTab.__proto__ || Object.getPrototypeOf(BackgroundTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isLoading: false, uploadingUuid: null }, _this.uploadStart = function (uuid) {
      return _this.setState({ uploadingUuid: uuid, isLoading: true });
    }, _this.uploadStop = function () {
      return _this.setState({ uploadingUuid: null, isLoading: false });
    }, _this.upload = function () {
      var bg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_this.state.isLoading) return;

      _this.uploadStart(bg.uuid);
      _this.props.onFileUpload(bg.url_public, _this.props.uploaderConfig).then(function () {
        return _this.uploadStop();
      }, function () {
        return _this.uploadStop();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BackgroundTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onGetBackgrounds();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isLoading = _state.isLoading,
          uploadingUuid = _state.uploadingUuid;

      var itemStyles = styles.container.item;

      return React.createElement(
        'div',
        { style: [styles.container] },
        this.props.backgrounds.map(function (bg) {
          return React.createElement(
            'div',
            {
              style: [itemStyles, isLoading && uploadingUuid === bg.uuid && itemStyles.loading.active, isLoading && uploadingUuid !== bg.uuid && itemStyles.loading.notActive],
              key: 'bg-' + bg.uuid,
              onClick: _this2.upload.bind(_this2, bg)
            },
            React.createElement('img', { style: [styles.container.item.img], src: bg.url_preview, width: 'auto', height: '100%' })
          );
        })
      );
    }
  }]);

  return BackgroundTab;
}(Component);

export default connect(function (_ref2) {
  var _ref2$uploader = _ref2.uploader,
      backgrounds = _ref2$uploader.backgrounds,
      uploaderConfig = _ref2$uploader.uploaderConfig;
  return { backgrounds: backgrounds, uploaderConfig: uploaderConfig };
}, function (dispatch) {
  return {
    onFileUpload: function onFileUpload(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    },
    onGetBackgrounds: function onGetBackgrounds() {
      return dispatch(getBackgrounds());
    }
  };
})(Radium(BackgroundTab));