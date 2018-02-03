import * as SearchAPI from '../services/searchApi.service';

export var searchImages = function searchImages(q) {
  return function (dispatch) {
    return SearchAPI.search(q).then(function (response) {
      dispatch({ type: 'SEARCH_FETCH_IMAGES_SUCCESS', payload: response });
    });
  };
};