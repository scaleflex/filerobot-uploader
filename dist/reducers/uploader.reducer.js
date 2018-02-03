var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  isVisible: false,
  backgrounds: [],
  modules: ['USER_UPLOAD', 'SEARCH', 'BACKGROUNDS', 'ICONS'],
  activeModules: [],
  tabs: [],
  filteredTabs: [],
  activeTab: null,
  uploaderConfig: {
    uploadPath: null,
    uploadParams: {
      opt_auth_upload_key: null
    }
  },
  uploadHandler: function uploadHandler() {
    var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return console.warn('Uploaded!', files);
  }
};

var uploader = function uploader() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case 'MODAL_OPEN':
      return _visibilityOpen(state, payload);
    case 'MODAL_CLOSE':
      return _visibilityClose(state, payload);
    case 'SET_TABS':
      return _setTabs(state, payload);
    case 'FETCH_BACKGROUNDS_SUCCESS':
      return _fetchBgSuccess(state, payload);
    case 'ACTIVATE_TAB':
      return _activateTab(state, payload);
    case 'SET_UPLOADER_CONFIG':
      return _setUploaderConfig(state, payload);
    case 'SET_ACTIVE_MODULES':
      return _setActiveModules(state, payload);
    case 'SET_UPLOAD_HANDLER':
      return _setUploadHandler(state, payload);
    case 'FILES_UPLOADED':
      return _filesUploaded(state, payload);
    default:
      return state;
  }
};

var _fetchBgSuccess = function _fetchBgSuccess(state) {
  var backgrounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _extends({}, state, { backgrounds: backgrounds });
};

var _visibilityOpen = function _visibilityOpen(state) {
  var activeTab = Object.assign({}, state.activeTab || {});

  if (state.filteredTabs.length) activeTab = state.filteredTabs[0];

  return _extends({}, state, { isVisible: true, activeTab: activeTab });
};

var _visibilityClose = function _visibilityClose(state) {
  return _extends({}, state, { isVisible: false, activeTab: null });
};

var _activateTab = function _activateTab(state, activeTab) {
  return _extends({}, state, { activeTab: activeTab });
};

var _setUploaderConfig = function _setUploaderConfig(state) {
  var newUploaderConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var uploaderConfig = Object.assign({}, state.uploaderConfig, newUploaderConfig);

  return _extends({}, state, { uploaderConfig: uploaderConfig });
};

var _setActiveModules = function _setActiveModules(state) {
  var _activeModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var activeModules = (_activeModules || []).filter(function (_m) {
    return _m && state.modules.indexOf(_m) !== -1;
  });
  var filteredTabs = state.tabs.filter(function (tab) {
    return tab.id && activeModules.indexOf(tab.id) !== -1;
  });

  return _extends({}, state, { activeModules: activeModules, filteredTabs: filteredTabs });
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

var _setTabs = function _setTabs(state) {
  var tabs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var filteredTabs = tabs.filter(function (tab) {
    return tab.id && state.activeModules.indexOf(tab.id) !== -1;
  });

  return _extends({}, state, { tabs: tabs, filteredTabs: filteredTabs });
};

export default uploader;