import * as BgAPI from '../services/bgApi.service';
import * as API from "../services/api.service";

export var getBackgrounds = function getBackgrounds() {
  return function (dispatch) {
    return BgAPI.getBackgrounds().then(function (_ref) {
      var status = _ref.status,
          backgrounds = _ref.backgrounds;

      if (status === 'success' && backgrounds) {
        dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: backgrounds });
      }
    });
  };
};

export var modalOpen = function modalOpen() {
  return function (dispatch) {
    return dispatch({ type: 'MODAL_OPEN', payload: null });
  };
};

export var modalClose = function modalClose() {
  return function (dispatch) {
    return dispatch({ type: 'MODAL_CLOSE', payload: null });
  };
};

export var activateTab = function activateTab(activeTab) {
  return function (dispatch) {
    return dispatch({ type: 'ACTIVATE_TAB', payload: activeTab });
  };
};

export var setUploaderConfig = function setUploaderConfig(config) {
  return function (dispatch) {
    return dispatch({ type: 'SET_UPLOADER_CONFIG', payload: config });
  };
};

export var setActiveModules = function setActiveModules(modules) {
  return function (dispatch) {
    return dispatch({ type: 'SET_ACTIVE_MODULES', payload: modules });
  };
};

export var setTabs = function setTabs(tabs) {
  return function (dispatch) {
    return dispatch({ type: 'SET_TABS', payload: tabs });
  };
};

export var setUploadHandler = function setUploadHandler(handler) {
  return function (dispatch) {
    return dispatch({ type: 'SET_UPLOAD_HANDLER', payload: handler });
  };
};

export var uploadFiles = function uploadFiles(files, uploaderConfig) {
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files[]';
  return function (dispatch) {
    return API.uploadFiles(files, uploaderConfig, dataType).then(function (files) {
      dispatch({ type: 'FILES_UPLOADED', payload: files });
      setTimeout(function () {
        return dispatch(modalClose());
      });

      return files;
    });
  };
};

export var uploadFilesFromUrls = function uploadFilesFromUrls() {
  var filesUrls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var uploaderConfig = arguments[1];
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files_url[]';
  return function (dispatch) {
    return dispatch(uploadFiles(Array.isArray(filesUrls) ? filesUrls : [filesUrls], uploaderConfig, dataType));
  };
};