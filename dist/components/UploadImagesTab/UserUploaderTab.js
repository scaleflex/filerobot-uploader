'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _index = require('../../assets/styles/index');

var _reactRedux = require('react-redux');

var _index2 = require('../../actions/index');

var _index3 = require('../../utils/index');

var _index4 = require('../../styledComponents/index');

var _dist = require('scaleflex-react-ui-kit/dist');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      var self = _this.props;

      _this.uploadStart();
      (isUploadFromUrl ? _this.props.onFileUploadFromUrl(url, _this.props.uploaderConfig) : _this.props.onFilesUpload(_this.state.files, _this.props.uploaderConfig)).then(function (files) {
        _this.uploadSuccess(files);
        self.uploaderConfig.uploadHandler(files);
        self.modalClose();
      }).catch(function (error) {
        _this.uploadError(error.msg);
      });
    }, _this.uploadFromWeb = function () {
      var value = _this._uploadFromWebField.value;
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

      var uploadBlock_style = _index.DragDropCss.container.uploadBlock;

      return _react2.default.createElement(
        'div',
        { style: [_index.DragDropCss.container] },
        step !== STEP.UPLOADED && _react2.default.createElement(
          'div',
          {
            onDragOver: function onDragOver(e) {
              e.preventDefault();
              _this2.setState({ isDragOver: true });
            },
            onDragEnter: function onDragEnter(e) {
              e.preventDefault();
              _this2.setState({ isDragOver: true });
            },
            onDragLeave: function onDragLeave(e) {
              e.preventDefault();
              _this2.setState({ isDragOver: false });
            },
            onDragEnd: function onDragEnd(e) {
              e.preventDefault();
              _this2.setState({ isDragOver: false });
            },
            onDrop: this.fileDropHandler,
            style: [uploadBlock_style, this.state.isDragOver && { background: "rgba(210, 253, 207, 0.5)" }],
            method: 'post',
            encType: 'multipart/form-data'
          },
          (step === STEP.DEFAULT || step === STEP.ERROR) && _react2.default.createElement(
            'div',
            { style: [uploadBlock_style.inputBox] },
            _react2.default.createElement('input', {
              style: [uploadBlock_style.inputBox.file],
              type: 'file',
              name: 'files[]',
              ref: 'fileInput',
              'data-multiple-caption': '{count} files selected',
              defaultValue: '',
              tabIndex: -1,
              multiple: true,
              onChange: this.fileChangeHandler
            }),
            _react2.default.createElement(
              'div',
              { style: [uploadBlock_style.inputBox.label] },
              _react2.default.createElement(
                'span',
                { style: [uploadBlock_style.inputBox.label.dragDropText] },
                'Drag file here'
              ),
              _react2.default.createElement(
                'div',
                { style: [uploadBlock_style.inputBox.label.orText] },
                'or'
              ),
              _react2.default.createElement(
                'button',
                {
                  key: 'browse-your-computer',
                  autoFocus: true,
                  style: [_index.CSS.button, { margin: 'auto', fontWeight: 400, textTransform: 'none' }],
                  onClick: function onClick() {
                    _this2.refs.fileInput.click();
                  }
                },
                'Browse your computer'
              ),
              _react2.default.createElement(
                'div',
                { style: [uploadBlock_style.inputBox.label.orText, { paddingBottom: 0 }] },
                'or'
              ),
              _react2.default.createElement(
                _index4.SearchWrapper,
                null,
                _react2.default.createElement(
                  _index4.SearchGroup,
                  null,
                  _react2.default.createElement(_index4.InputSearch, {
                    type: 'search',
                    innerRef: function innerRef(node) {
                      return _this2._uploadFromWebField = node;
                    },
                    autoFocus: true,
                    defaultValue: '',
                    placeholder: 'Enter URL to upload from web',
                    onKeyDown: function onKeyDown(ev) {
                      return (0, _index3.isEnterClick)(ev) && _this2.uploadFromWeb();
                    }
                  }),
                  _react2.default.createElement(
                    _index4.ButtonSearch,
                    {
                      key: 'ok',
                      className: 'ae-btn',
                      onClick: this.uploadFromWeb
                    },
                    'Upload'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { style: [{
                    fontSize: "12px",
                    color: '#5D636B',
                    fontWeight: "200",
                    marginTop: "5px"
                  }] },
                'Accepted file types: gif, jpeg, png, bmp, ico. Up to 10MB.'
              )
            ),
            _react2.default.createElement(
              'div',
              { ref: 'submitBtn', className: 'ae-btn', style: [uploadBlock_style.inputBox.submitBtn], type: 'submit' },
              'Upload'
            )
          ),
          step === STEP.UPLOADING && _react2.default.createElement(
            'div',
            { style: [uploadBlock_style.uploadingBox] },
            _react2.default.createElement(_dist.Spinner, { overlay: true, show: true }),
            _react2.default.createElement(
              'span',
              null,
              'Uploading'
            )
          ),
          step === STEP.ERROR && _react2.default.createElement(
            'div',
            { style: [uploadBlock_style.errorBox] },
            _react2.default.createElement(
              'span',
              { style: [uploadBlock_style.errorBox.errorMsg], role: 'alert' },
              errorMsg
            )
          )
        )
      );
    }
  }]);

  return UserUploaderTab;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (_ref3) {
  var uploaderConfig = _ref3.uploader.uploaderConfig;
  return { uploaderConfig: uploaderConfig };
}, {
  onFilesUpload: _index2.uploadFiles,
  onFileUploadFromUrl: _index2.uploadFilesFromUrls,
  modalClose: _index2.modalClose
})((0, _radium2.default)(UserUploaderTab));