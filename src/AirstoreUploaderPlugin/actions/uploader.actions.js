import * as BgAPI from '../services/bgApi.service';
import * as API from "../services/api.service";

export const getBackgrounds = () => dispatch =>
  BgAPI.getBackgrounds().then((files) => {
    if (files) {
      dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: files });
    }
  });

export const modalOpen = (tabName) => dispatch => dispatch({ type: 'MODAL_OPEN', payload: tabName });

export const modalClose = () => dispatch => dispatch({ type: 'MODAL_CLOSE', payload: null });

export const activateTab = (activeTab) => dispatch => dispatch({ type: 'ACTIVATE_TAB', payload: activeTab });

export const setUploaderConfig = (config) => dispatch => dispatch({ type: 'SET_UPLOADER_CONFIG', payload: config });

export const setActiveModules = (modules) => dispatch => dispatch({ type: 'SET_ACTIVE_MODULES', payload: modules });

export const setTabs = (tabs) => dispatch => dispatch({ type: 'SET_TABS', payload: tabs });

export const setUploadHandler = (handler) => dispatch => dispatch({ type: 'SET_UPLOAD_HANDLER', payload: handler });

export const uploadFiles = (files, uploaderConfig, dataType = 'files[]') => dispatch =>
  API.uploadFiles(files, uploaderConfig, dataType).then(files => {
    dispatch({ type: 'FILES_UPLOADED', payload: files });
    setTimeout(() => dispatch(modalClose()));

    return files;
  });

export const uploadFilesFromUrls = (filesUrls = [], uploaderConfig, dataType = 'files_url[]') => dispatch =>
  dispatch(uploadFiles(Array.isArray(filesUrls) ? filesUrls : [filesUrls], uploaderConfig, dataType));