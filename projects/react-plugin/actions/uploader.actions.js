import * as BgAPI from '../services/imagesApi.service';
import * as API from "../services/api.service";
import { MODAL_OPEN, ACTIVATE_TAB, SET_UPLOADER_CONFIG } from '../reducers';


export const getBackgrounds = () => dispatch =>
  BgAPI.getBackgrounds().then((files) => {
    if (files) {
      dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: files });
    }
  });

export const modalOpen = tabId => dispatch => dispatch({ type: MODAL_OPEN, tabId });

export const modalClose = () => dispatch => dispatch({ type: 'MODAL_CLOSE', payload: null });

export const activateTab = tabId => dispatch => dispatch({ type: ACTIVATE_TAB, tabId });

export const setUploaderConfig = config => dispatch => dispatch({ type: SET_UPLOADER_CONFIG, config });

export const setUploadHandler = (handler) => dispatch => dispatch({ type: 'SET_UPLOAD_HANDLER', payload: handler });

export const uploadFiles = (files, uploaderConfig, dataType = 'files[]', dir) => dispatch => {
  return API.uploadFiles(files, uploaderConfig, dataType, dir).then(files => {
    //dispatch({ type: 'FILES_UPLOADED', payload: files });
    //setTimeout(() => dispatch(modalClose()));
    return files;
  });
}

export const uploadFilesToDir = (files, uploaderConfig, dataType = 'files[]', dir) => dispatch =>
  API.uploadFiles(files, uploaderConfig, dataType, dir).then(files => {
    //dispatch({ type: 'FILES_UPLOADED', payload: files });

    return files;
  });

export const uploadFilesFromUrls = (filesUrls = [], uploaderConfig, dataType = 'application/json') => dispatch =>
  dispatch(uploadFiles(Array.isArray(filesUrls) ? filesUrls : [filesUrls], uploaderConfig, dataType));