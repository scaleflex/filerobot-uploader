const initialState = {
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
  uploadHandler: (files = []) => console.warn('Uploaded!', files)
};


const uploader = (state = initialState, action) => {
  const { type, payload } = action;

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

const _fetchBgSuccess = (state, backgrounds = []) => ({...state, backgrounds });

const _visibilityOpen = state => {
  let activeTab = Object.assign({}, state.activeTab || {});

  if (state.filteredTabs.length) activeTab = state.filteredTabs[0];

  return {...state, isVisible: true, activeTab };
};

const _visibilityClose = state => ({...state, isVisible: false, activeTab: null });

const _activateTab = (state, activeTab) => ({...state, activeTab });

const _setUploaderConfig = (state, newUploaderConfig = {}) => {
  const uploaderConfig = Object.assign({}, state.uploaderConfig, newUploaderConfig);

  return {...state, uploaderConfig };
};

const _setActiveModules = (state, _activeModules = []) => {
  const activeModules = (_activeModules || []).filter(_m => _m && state.modules.indexOf(_m) !== -1);
  const filteredTabs = state.tabs.filter(tab => tab.id && activeModules.indexOf(tab.id) !== -1);

  return {...state, activeModules, filteredTabs };
};

const _setUploadHandler = (state, onUpload = null) =>
  ({...state, uploadHandler: typeof onUpload === 'function' ? onUpload : state.uploadHandler});

const _filesUploaded = (state, files = []) => {
  if (typeof state.uploadHandler === 'function')
    state.uploadHandler(files);
  else
    console.warn('onUpload() is not defined!');

  return {...state};
};

const _setTabs = (state, tabs = []) => {
  const filteredTabs = tabs.filter(tab => tab.id && state.activeModules.indexOf(tab.id) !== -1);

  return {...state, tabs, filteredTabs};
};

export default uploader;