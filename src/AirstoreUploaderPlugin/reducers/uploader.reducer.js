const initialState = {
  isVisible: false,
  backgrounds: [],
  modules: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'],
  activeModules: [],
  tabs: [],
  filteredTabs: [],
  activeTab: null,
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

const _fetchBgSuccess = (state, { files = [] }) => {
  const backgrounds = files.map((file = {}) => ({
    src: file.url_public || file.url_permalink,
    id: file.uuid,
    name: file.name,
    alt: ''
  }));

  return {...state, backgrounds };
};

const _visibilityOpen = (state, activeTabName) => {
  const nextTab = state.filteredTabs.find(tab => tab.id === activeTabName) || {};
  let activeTab = Object.assign({}, state.activeTab = {}, nextTab);

  if (!activeTab.id && state.filteredTabs.length) activeTab = state.filteredTabs[0];

  setTimeout(() => {
    const link = document.querySelector(`.airstore-uploader-navigation #tab-${activeTab.id}`);

    link.focus();
  })

  return {...state, isVisible: true, activeTab };
};

const _visibilityClose = state => ({...state, isVisible: false, activeTab: null });

const _activateTab = (state, activeTab) => ({...state, activeTab });

const _setUploaderConfig = (state, config = {}) => {

  const uploaderConfig = {
    uploadPath: `https://${config.CONTAINER}.api.airstore.io/upload`,
    uploadParams: config.UPLOAD_PARAMS,
    uploadKey: config.UPLOAD_KEY,
    container: config.CONTAINER,
    isShowAddTagBtn: config.IS_SHOW_ADD_TAG_BTN,
    isShowNotRelevantBtn: config.IS_SHOW_NOT_RELEVANT_BTN,
    limit: config.LIMIT_PER_RESPONSE || 100
  };

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