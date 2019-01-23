'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTIVATE_TAB = exports.MODAL_OPEN = exports.SET_UPLOADER_CONFIG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  isVisible: false,
  backgrounds: [],
  modules: [],
  activeTabId: 'UPLOAD',
  uploadHandler: function uploadHandler() {
    var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return console.warn('Uploaded!', files);
  }
};

var SET_UPLOADER_CONFIG = exports.SET_UPLOADER_CONFIG = 'airstore-uploader/uploader/SET_UPLOADER_CONFIG';
var MODAL_OPEN = exports.MODAL_OPEN = 'airstore-uploader/uploader/MODAL_OPEN';
var ACTIVATE_TAB = exports.ACTIVATE_TAB = 'airstore-uploader/uploader/ACTIVATE_TAB';

var uploader = function uploader() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_UPLOADER_CONFIG:
      return _setUploaderConfig(state, action.config);
    case MODAL_OPEN:
      return _visibilityOpen(state, action.tabId);
    case ACTIVATE_TAB:
      return _activateTab(state, action.tabId);
    case 'MODAL_CLOSE':
      return _visibilityClose(state, payload);
    case 'FETCH_BACKGROUNDS_SUCCESS':
      return _fetchBgSuccess(state, payload);
    case 'SET_UPLOAD_HANDLER':
      return _setUploadHandler(state, payload);
    case 'FILES_UPLOADED':
      return _filesUploaded(state, payload);
    default:
      return state;
  }
};

var _fetchBgSuccess = function _fetchBgSuccess(state, _ref) {
  var _ref$files = _ref.files,
      files = _ref$files === undefined ? [] : _ref$files;

  var backgrounds = files.map(function () {
    var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      src: file.url_public || file.url_permalink,
      id: file.uuid,
      name: file.name,
      alt: ''
    };
  });

  return _extends({}, state, { backgrounds: backgrounds });
};

var _visibilityOpen = function _visibilityOpen(state, activeTabId) {
  // todo
  //setTimeout(() => {
  //  const link = document.querySelector(`.airstore-uploader-navigation #tab-${activeTab.id}`);
  //
  //  if (link && link.focus) link.focus();
  //})

  return _extends({}, state, { isVisible: true, activeTabId: activeTabId });
};

var _visibilityClose = function _visibilityClose(state) {
  return _extends({}, state, { isVisible: false, activeTabId: null });
};

var _activateTab = function _activateTab(state, activeTabId) {
  return _extends({}, state, { activeTabId: activeTabId });
};

var _setUploaderConfig = function _setUploaderConfig(state) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var container = config.container || config.CONTAINER || _config2.default.container || '';

  config.tagging = config.tagging || config.TAGGING || _config2.default.tagging || {};

  var uploaderConfig = {
    container: container,
    uploadPath: 'https://' + container + '.api.airstore.io/v1/upload',
    uploadParams: config.uploadParams || config.UPLOAD_PARAMS || _config2.default.uploadParams,
    uploadKey: config.airstoreUploadKey || config.AIRSTORE_UPLOAD_KEY || _config2.default.airstoreUploadKey,
    openpixKey: config.openpixKey || config.OPENPIX_KEY || _config2.default.openpixKey,
    isShowAddTagBtn: config.isShowAddTagBtn || config.IS_SHOW_ADD_TAG_BTN || _config2.default.isShowAddTagBtn,
    isShowNotRelevantBtn: config.isShowNotRelevantBtn || config.IS_SHOW_NOT_RELEVANT_BTN || _config2.default.isShowNotRelevantBtn,
    limit: config.limitImagesPerResponse || config.LIMIT_IMAGES_PER_RESPONSE || _config2.default.limitImagesPerResponse || 100,
    folders: config.folders || config.UPLOADED_FOLDERS || _config2.default.folders || [{ dir: '/', label: 'All' }],
    language: config.language || config.LANGUAGE || _config2.default.language || 'en',
    tagging: _extends({
      active: !!config.tagging.active
    }, config.tagging),
    uploadHandler: config.onUpload || function () {}
  };

  return _extends({}, state, { uploaderConfig: uploaderConfig });
};

var _setUploadHandler = function _setUploadHandler(state) {
  var onUpload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return _extends({}, state, { uploadHandler: typeof onUpload === 'function' ? onUpload : state.uploadHandler });
};

var _filesUploaded = function _filesUploaded(state) {
  var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (typeof state.uploadHandler === 'function') state.uploadHandler(files);else console.warn('onUpload() is not defined!');

  return _extends({}, state);
};

exports.default = uploader;