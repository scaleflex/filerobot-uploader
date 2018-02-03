var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, DragDropCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, uploadFiles } from '../actions';
import { isEnterClick } from '../utils/index';

var STEP = {
  DEFAULT: 'DEFAULT',
  UPLOADING: 'UPLOADING',
  ERROR: 'ERROR',
  UPLOADED: 'UPLOADED'
};

var UserUploaderTab = function (_Component) {
  _inherits(UserUploaderTab, _Component);

  function UserUploaderTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UserUploaderTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserUploaderTab.__proto__ || Object.getPrototypeOf(UserUploaderTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      step: STEP.DEFAULT,
      errorMsg: '',
      isDragOver: false,
      files: [],
      uploadedFiles: []
    }, _this.isFilesValid = function (files) {
      return true;
    }, _this.fileDropHandler = function (event) {
      event.preventDefault();
      _this.changeFile((event.dataTransfer || event.originalEvent.dataTransfer).files);
    }, _this.fileChangeHandler = function (_ref2) {
      var target = _ref2.target;

      _this.changeFile(target.files);
    }, _this.changeFile = function () {
      var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.setState({ files: files });

      setTimeout(function () {
        if (files && _this.isFilesValid(files)) _this.upload();
      });
    }, _this.changeStep = function (step) {
      return _this.setState({ step: step });
    }, _this.uploadStart = function () {
      return _this.setState({ step: STEP.UPLOADING });
    }, _this.uploadSuccess = function (uploadedFiles) {
      return _this.setState({ step: STEP.UPLOADED, uploadedFiles: uploadedFiles });
    }, _this.uploadError = function (msg) {
      var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _this.setState({ step: STEP.ERROR, errorMsg: msg || 'Error' });
      if (timer) setTimeout(function () {
        return _this.changeStep(STEP.DEFAULT);
      }, timer);
    }, _this.upload = function () {
      var isUploadFromUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // if (this.state.isLoading) return;

      _this.uploadStart();
      (isUploadFromUrl ? _this.props.onFileUploadFromUrl(url, _this.props.uploaderConfig) : _this.props.onFilesUpload(_this.state.files, _this.props.uploaderConfig)).then(function (files) {
        return _this.uploadSuccess(files);
      }, function (error) {
        return _this.uploadError(error.msg);
      });
    }, _this.uploadFromWeb = function () {
      var value = _this.refs.uploadFromWebField.value;
      var isValid = value && /^(http:\/\/|https:\/\/|\/\/)/.test(value);

      if (isValid) _this.upload(true, value);else _this.uploadError(value ? 'URL not valid!' : 'Empty URL!', 4000);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UserUploaderTab, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          step = _state.step,
          _state$uploadedFiles = _state.uploadedFiles,
          uploadedFiles = _state$uploadedFiles === undefined ? [] : _state$uploadedFiles,
          _state$errorMsg = _state.errorMsg,
          errorMsg = _state$errorMsg === undefined ? '' : _state$errorMsg;

      var uploadBlock_style = styles.container.uploadBlock;

      return React.createElement(
        'div',
        { style: [styles.container] },
        step !== STEP.UPLOADED && React.createElement(
          'div',
          {
            onDragOver: function onDragOver(e) {
              e.preventDefault();_this2.setState({ isDragOver: true });
            },
            onDragEnter: function onDragEnter(e) {
              e.preventDefault();_this2.setState({ isDragOver: true });
            },
            onDragLeave: function onDragLeave(e) {
              e.preventDefault();_this2.setState({ isDragOver: false });
            },
            onDragEnd: function onDragEnd(e) {
              e.preventDefault();_this2.setState({ isDragOver: false });
            },
            onDrop: this.fileDropHandler,
            style: [uploadBlock_style, this.state.isDragOver && { background: "rgba(210, 253, 207, 0.5)" }],
            method: 'post',
            encType: 'multipart/form-data'
          },
          (step === STEP.DEFAULT || step === STEP.ERROR) && React.createElement(
            'div',
            { style: [uploadBlock_style.inputBox] },
            React.createElement('input', {
              style: [uploadBlock_style.inputBox.file],
              type: 'file',
              name: 'files[]',
              ref: 'fileInput',
              'data-multiple-caption': '{count} files selected',
              defaultValue: '',
              onChange: this.fileChangeHandler
            }),
            React.createElement(
              'label',
              { style: [uploadBlock_style.inputBox.label] },
              React.createElement(
                'span',
                { style: [uploadBlock_style.inputBox.label.dragDropText] },
                'Drag file here'
              ),
              React.createElement(
                'div',
                { style: [uploadBlock_style.inputBox.label.orText] },
                'OR'
              ),
              React.createElement(
                'button',
                {
                  style: [CSS.button, { margin: 'auto' }],
                  onClick: function onClick() {
                    _this2.refs.fileInput.click();
                  }
                },
                'Browse your computer'
              ),
              React.createElement(
                'div',
                { style: [uploadBlock_style.inputBox.label.orText] },
                'OR'
              ),
              React.createElement(
                'div',
                { style: [{ display: 'flex' }] },
                React.createElement('input', {
                  type: 'text',
                  style: [CSS.field, { width: '100%' }],
                  placeholder: 'Enter URL to upload from web',
                  ref: 'uploadFromWebField',
                  onKeyDown: function onKeyDown(ev) {
                    return isEnterClick(ev) && _this2.uploadFromWeb();
                  }
                }),
                React.createElement(
                  'button',
                  { style: [CSS.button], onClick: this.uploadFromWeb },
                  'OK'
                )
              ),
              React.createElement(
                'div',
                { style: [{ "fontSize": "12px", "color": "rgb(186, 186, 186)", "fontWeight": "200", "marginTop": "5px" }] },
                'Accepted file types: gif, jpeg, png, bmp, ico. Up to 10MB.'
              )
            ),
            React.createElement(
              'div',
              { ref: 'submitBtn', style: [uploadBlock_style.inputBox.submitBtn], type: 'submit' },
              'Upload'
            )
          ),
          step === STEP.UPLOADING && React.createElement(
            'div',
            { style: [uploadBlock_style.uploadingBox] },
            React.createElement(
              'i',
              {
                style: [styles.fa, styles.faSpin, styles.faFw, { font: 'normal normal normal 20px/1 FontAwesome' }]
              },
              '\uF110'
            ),
            React.createElement(
              'span',
              null,
              'Uploading'
            )
          ),
          step === STEP.ERROR && React.createElement(
            'div',
            { style: [uploadBlock_style.errorBox] },
            React.createElement(
              'span',
              { style: [uploadBlock_style.errorBox.errorMsg] },
              errorMsg
            )
          )
        ),
        step === STEP.UPLOADED && React.createElement(
          'div',
          { className: 'image-wrapper text-center empty-background-image' },
          React.createElement(
            'div',
            { className: 'image-block' },
            uploadedFiles.length && React.createElement('img', { src: uploadedFiles[0].public_link })
          ),
          React.createElement(
            'div',
            { className: 'replace-image' },
            React.createElement(
              'a',
              { className: 'replace-image-btn', href: '#' },
              'Replace image'
            )
          )
        )
      );
    }
  }]);

  return UserUploaderTab;
}(Component);

export default connect(function (_ref3) {
  var uploaderConfig = _ref3.uploader.uploaderConfig;
  return { uploaderConfig: uploaderConfig };
}, function (dispatch) {
  return {
    onFilesUpload: function onFilesUpload(files, uploaderConfig) {
      return dispatch(uploadFiles(files, uploaderConfig));
    },
    onFileUploadFromUrl: function onFileUploadFromUrl(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    }
  };
})(Radium(UserUploaderTab));