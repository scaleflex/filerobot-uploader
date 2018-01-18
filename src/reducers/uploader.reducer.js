const initialState = {
  isVisible: false,
  backgrounds: [],
  modules: ['USER_UPLOAD', 'ICONS', 'BACKGROUNDS'],
  activeModules: [],
  activeTab: null,
  uploaderConfig: {
    uploadPath: null,
    uploadParams: {
      opt_auth_upload_key: null
    }
  }
};


const uploader = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'MODAL_OPEN':
      return _visibilityOpen(state, payload);
    case 'MODAL_CLOSE':
      return _visibilityClose(state, payload);
    case 'FETCH_BACKGROUNDS_SUCCESS':
      return _fetchBgSuccess(state, payload);
    case 'ACTIVATE_TAB':
      return _activateTab(state, payload);
    case 'SET_UPLOADER_CONFIG':
      return _setUploaderConfig(state, payload);
    case 'SET_ACTIVE_MODULES':
      return _setActiveModules(state, payload);
    default:
      return state;
  }
};

const _fetchBgSuccess = (state, backgrounds = []) => ({...state, backgrounds });

const _visibilityOpen = state => ({...state, isVisible: true });

const _visibilityClose = state => ({...state, isVisible: false });

const _activateTab = (state, activeTab) => ({...state, activeTab });

const _setUploaderConfig = (state, newUploaderConfig = {}) => {
  const uploaderConfig = Object.assign({}, state.uploaderConfig, newUploaderConfig);

  return {...state, uploaderConfig };
};

const _setActiveModules = (state, _activeModules = []) => {
  const activeModules = (_activeModules || []).filter(_m => _m && state.modules.indexOf(_m) !== -1);

  return {...state, activeModules };
};


export default uploader;