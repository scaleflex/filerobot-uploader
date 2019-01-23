'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prettyBytes = require('pretty-bytes');

var _prettyBytes2 = _interopRequireDefault(_prettyBytes);

var _reactTagsinput = require('react-tagsinput');

var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);

var _Spinner = require('../Spinner');

var _TaggingTabStyled = require('./TaggingTab.styled.js');

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _api = require('../../services/api.service');

var _actions = require('../../actions');

var _reactI18nify = require('react-i18nify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaggingTab = function (_Component) {
  _inherits(TaggingTab, _Component);

  function TaggingTab(props) {
    _classCallCheck(this, TaggingTab);

    var _this = _possibleConstructorReturn(this, (TaggingTab.__proto__ || Object.getPrototypeOf(TaggingTab)).call(this));

    _initialiseProps.call(_this);

    var _props$language = props.language,
        language = _props$language === undefined ? 'en' : _props$language,
        _props$files = props.files,
        files = _props$files === undefined ? {} : _props$files;

    var _files = _slicedToArray(files, 1),
        _files$ = _files[0],
        file = _files$ === undefined ? {} : _files$;

    var date = new Date();
    var options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    var currentTime = date.toLocaleTimeString("en-us", options);

    file.properties = file.properties || {};
    file.properties.tags = file.properties.tags || [];

    _this.state = {
      tags: file.properties.tags.map(function (tag) {
        return tag[language];
      }) || [],
      description: file.properties.description || '',
      isLoading: false,
      errorMessage: '',
      currentTime: currentTime,
      firstLoad: file.created_at ? new Date(file.created_at).toLocaleTimeString("en-us", options) : currentTime,
      lastModified: file.modified_at ? new Date(file.modified_at).toLocaleTimeString("en-us", options) : currentTime,
      tagsGenerated: false
    };
    return _this;
  }

  _createClass(TaggingTab, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          isLoading = _state.isLoading,
          errorMessage = _state.errorMessage,
          currentTime = _state.currentTime;
      var _props = this.props,
          autoTagging = _props.autoTagging,
          prevTab = _props.prevTab;

      var _props$files2 = _slicedToArray(this.props.files, 1),
          _props$files2$ = _props$files2[0],
          file = _props$files2$ === undefined ? {} : _props$files2$;

      var generateTagInfo = _reactI18nify.I18n.t('tagging.will_automatically_generate_tags');

      return _react2.default.createElement(
        _TaggingTabStyled.TaggingTabWrapper,
        null,
        _react2.default.createElement(
          _TaggingTabStyled.TaggingContent,
          null,
          prevTab && _react2.default.createElement(
            _TaggingTabStyled.GoBack,
            { href: 'javascript:void(0)', onClick: this.goBack },
            _react2.default.createElement(_TaggingTabStyled.BackIcon, null),
            _reactI18nify.I18n.t('tagging.go_back')
          ),
          _react2.default.createElement(
            _TaggingTabStyled.FileWrapper,
            null,
            _react2.default.createElement(
              _TaggingTabStyled.UploadedImageWrapper,
              null,
              _react2.default.createElement(_TaggingTabStyled.UploadedImage, { src: 'https://demo.cloudimg.io/width/800/q80.foil1/' + file.url_permalink })
            ),
            _react2.default.createElement(
              _TaggingTabStyled.UploadedImageDesc,
              null,
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _TaggingTabStyled.PropName,
                    null,
                    _reactI18nify.I18n.t('tagging.file_name'),
                    ':'
                  ),
                  _react2.default.createElement(
                    _TaggingTabStyled.PropValue,
                    null,
                    file.name
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _TaggingTabStyled.PropName,
                    null,
                    _reactI18nify.I18n.t('tagging.size'),
                    ':'
                  ),
                  _react2.default.createElement(
                    _TaggingTabStyled.PropValue,
                    null,
                    (0, _prettyBytes2.default)(file.size)
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _TaggingTabStyled.PropName,
                    null,
                    _reactI18nify.I18n.t('tagging.first_upload'),
                    ':'
                  ),
                  _react2.default.createElement(
                    _TaggingTabStyled.PropValue,
                    null,
                    currentTime
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _TaggingTabStyled.PropName,
                    null,
                    _reactI18nify.I18n.t('tagging.last_modified'),
                    ':'
                  ),
                  _react2.default.createElement(
                    _TaggingTabStyled.PropValue,
                    null,
                    currentTime
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _TaggingTabStyled.InputsBlock,
            null,
            _react2.default.createElement(_TaggingTabStyled.Textarea, {
              value: this.state.description,
              placeholder: _reactI18nify.I18n.t('tagging.add_description'),
              onChange: this.handleDescriptionChange
            }),
            _react2.default.createElement(
              _TaggingTabStyled.TagsInputWrapper,
              null,
              _react2.default.createElement(_reactTagsinput2.default, {
                value: this.state.tags,
                onChange: this.handleTagsChange,
                inputProps: {
                  placeholder: _reactI18nify.I18n.t('tagging.add_a_tag_separate_by_pressing_enter')
                }
              })
            )
          ),
          errorMessage && _react2.default.createElement(
            _TaggingTabStyled.ErrorWrapper,
            null,
            _react2.default.createElement(
              _TaggingTabStyled.ErrorParagraph,
              null,
              errorMessage
            )
          )
        ),
        _react2.default.createElement(
          _TaggingTabStyled.TaggingFooter,
          null,
          autoTagging && _react2.default.createElement(
            _TaggingTabStyled.Button,
            {
              disabled: this.state.tagsGenerated,
              onClick: this.generateTags },
            _reactI18nify.I18n.t('tagging.generate_tags'),
            ' ',
            _react2.default.createElement(_TaggingTabStyled.InfoIcon, { 'data-tip': generateTagInfo })
          ),
          _react2.default.createElement(
            _TaggingTabStyled.Button,
            { success: true, onClick: this.saveMetadata },
            _reactI18nify.I18n.t('tagging.save')
          )
        ),
        _react2.default.createElement(_Spinner.Spinner, { show: isLoading, overlay: true }),
        _react2.default.createElement(_reactTooltip2.default, { offset: { top: 0, right: 2 }, effect: 'solid' })
      );
    }
  }]);

  return TaggingTab;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleDescriptionChange = function (event) {
    _this2.setState({ description: event.target.value, errorMessage: '' });
  };

  this.handleTagsChange = function (tags) {
    _this2.setState({ tags: tags, errorMessage: '' });
  };

  this.saveMetadata = function () {
    var _state2 = _this2.state,
        description = _state2.description,
        tags = _state2.tags;
    var _props2 = _this2.props,
        files = _props2.files,
        uploadHandler = _props2.uploadHandler,
        language = _props2.language,
        config = _props2.config;

    var _props$files3 = _slicedToArray(_this2.props.files, 1),
        _props$files3$ = _props$files3[0],
        file = _props$files3$ === undefined ? {} : _props$files3$;

    var nextTags = tags.map(function (tagName) {
      return _defineProperty({}, language, tagName);
    });

    (0, _api.saveMetaData)(file.uuid, { description: description, tags: nextTags }, config).then(function (response) {
      if (response.status === 'success') {
        files[0].properties = response.properties;
        uploadHandler(files, nextTags, description);

        _this2.setState({ isLoading: true }, function () {
          _this2.props.setPostUpload(false);

          if (_this2.props.onClose) _this2.props.onClose();

          _this2.props.modalClose();
        });
      } else {
        _this2.setState({
          errorMessage: response.msg || response.message || _reactI18nify.I18n.t('tagging.something_went_wrong_try_again'),
          isLoading: false
        });
      }
    });

    _this2.setState({ isLoading: true });
  };

  this.generateTags = function () {
    if (_this2.state.tagsGenerated) return;

    var _props3 = _this2.props,
        taggingConfig = _props3.taggingConfig,
        language = _props3.language;

    var _props$files4 = _slicedToArray(_this2.props.files, 1),
        _props$files4$ = _props$files4[0],
        file = _props$files4$ === undefined ? {} : _props$files4$;

    (0, _api.generateTags)(file.url_permalink, taggingConfig, language).then(function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var tags = _ref2.tags,
          props = _objectWithoutProperties(_ref2, ['tags']);

      if (tags) {
        if (!tags.length) {
          alert(_reactI18nify.I18n.t('tagging.asset_could_not_be_automatically_tagged'));
        }

        _this2.setState({
          tags: [].concat(_toConsumableArray(_this2.state.tags), _toConsumableArray(tags.map(function (item) {
            return item && item.tag && item.tag[language];
          }))),
          isLoading: false,
          tagsGenerated: true
        });
      } else {
        _this2.setState({
          isLoading: false,
          errorMessage: props.msg || props.message || _reactI18nify.I18n.t('tagging.something_went_wrong_try_again')
        });
      }
    });

    _this2.setState({ isLoading: true, errorMessage: '' });
  };

  this.goBack = function () {
    _this2.props.setPostUpload(false);
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    uploadHandler: state.uploader.uploaderConfig.uploadHandler,
    autoTagging: state.uploader.uploaderConfig.tagging.auto_tagging,
    taggingConfig: state.uploader.uploaderConfig.tagging,
    language: state.uploader.uploaderConfig.language,
    config: state.uploader.uploaderConfig
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { modalClose: _actions.modalClose, generateTags: _api.generateTags })(TaggingTab);