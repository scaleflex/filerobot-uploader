import * as SearchAPI from '../services/searchApi.service';

export const searchImages = (q) => dispatch =>
  SearchAPI.search(q).then(response => {
    dispatch({ type: 'SEARCH_FETCH_IMAGES_SUCCESS', payload: response });
  });