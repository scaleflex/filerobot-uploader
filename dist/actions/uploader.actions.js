'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFilesFromUrls = exports.uploadFilesToDir = exports.uploadFiles = exports.setUploadHandler = exports.setTabs = exports.setActiveModules = exports.setUploaderConfig = exports.activateTab = exports.modalClose = exports.modalOpen = exports.getBackgrounds = undefined;

var _imagesApi = require('../services/imagesApi.service');

var BgAPI = _interopRequireWildcard(_imagesApi);

var _api = require('../services/api.service');

var API = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getBackgrounds = exports.getBackgrounds = function getBackgrounds() {
  return function (dispatch) {
    return BgAPI.getBackgrounds().then(function (files) {
      if (files) {
        dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: files });
      }
    });
  };
};

var modalOpen = exports.modalOpen = function modalOpen(tabName) {
  return function (dispatch) {
    return dispatch({ type: 'MODAL_OPEN', payload: tabName });
  };
};

var modalClose = exports.modalClose = function modalClose() {
  return function (dispatch) {
    return dispatch({ type: 'MODAL_CLOSE', payload: null });
  };
};

var activateTab = exports.activateTab = function activateTab(activeTab) {
  return function (dispatch) {
    return dispatch({ type: 'ACTIVATE_TAB', payload: activeTab });
  };
};

var setUploaderConfig = exports.setUploaderConfig = function setUploaderConfig(config) {
  return function (dispatch) {
    return dispatch({ type: 'SET_UPLOADER_CONFIG', payload: config });
  };
};

var setActiveModules = exports.setActiveModules = function setActiveModules(modules) {
  return function (dispatch) {
    return dispatch({ type: 'SET_ACTIVE_MODULES', payload: modules });
  };
};

var setTabs = exports.setTabs = function setTabs(tabs) {
  return function (dispatch) {
    return dispatch({ type: 'SET_TABS', payload: tabs });
  };
};

var setUploadHandler = exports.setUploadHandler = function setUploadHandler(handler) {
  return function (dispatch) {
    return dispatch({ type: 'SET_UPLOAD_HANDLER', payload: handler });
  };
};

var uploadFiles = exports.uploadFiles = function uploadFiles(files, uploaderConfig) {
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files[]';
  var dir = arguments[3];
  return function (dispatch) {
    return API.uploadFiles(files, uploaderConfig, dataType, dir).then(function (files) {
      //dispatch({ type: 'FILES_UPLOADED', payload: files });
      //setTimeout(() => dispatch(modalClose()));
      return files;
    });
  };
};

var uploadFilesToDir = exports.uploadFilesToDir = function uploadFilesToDir(files, uploaderConfig) {
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files[]';
  var dir = arguments[3];
  return function (dispatch) {
    return API.uploadFiles(files, uploaderConfig, dataType, dir).then(function (files) {
      //dispatch({ type: 'FILES_UPLOADED', payload: files });

      return files;
    });
  };
};

var uploadFilesFromUrls = exports.uploadFilesFromUrls = function uploadFilesFromUrls() {
  var filesUrls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var uploaderConfig = arguments[1];
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'application/json';
  return function (dispatch) {
    return dispatch(uploadFiles(Array.isArray(filesUrls) ? filesUrls : [filesUrls], uploaderConfig, dataType));
  };
};