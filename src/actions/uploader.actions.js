import * as API from '../components/bg-library/api.service';

export const getBackgrounds = () => dispatch =>
  API.getBackgrounds().then(({ status, backgrounds }) => {
    if (status === 'success' && backgrounds) {
      dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: backgrounds });
    }
  });

// TODO
// export const uploadFromUrl = (url) => dispatch =>
//   API.getBackgrounds().then(({ status, backgrounds }) => {
//     if (status === 'success' && backgrounds) {
//       dispatch({ type: 'FETCH_BACKGROUNDS_SUCCESS', payload: backgrounds });
//     }
//   });

export const modalOpen = () => dispatch => dispatch({ type: 'MODAL_OPEN', payload: null });

export const modalClose = () => dispatch => dispatch({ type: 'MODAL_CLOSE', payload: null });

export const activateTab = (activeTab) => dispatch => dispatch({ type: 'ACTIVATE_TAB', payload: activeTab });

export const setUploaderConfig = (config) => dispatch => dispatch({ type: 'SET_UPLOADER_CONFIG', payload: config });

export const setActiveModules = (modules) => dispatch => dispatch({ type: 'SET_ACTIVE_MODULES', payload: modules });