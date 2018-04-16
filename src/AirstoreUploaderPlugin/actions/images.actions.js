import * as ImagesAPI from '../services/imagesApi.service';


export const getImagesTags = () => dispatch =>
  ImagesAPI.getImagesTags().then(tags => {
    dispatch({ type: 'IMAGES_FETCH_TAGS_SUCCESS', payload: tags });
  });

export const fetchImages = (searchParams, relevantActiveTags, onSuccess = () => {}) => dispatch => {
  const successHandler = !searchParams.offset ?
    (response) => {
      setTimeout(() => onSuccess());

      return dispatch({
        type: 'IMAGES_FETCH_SUCCESS',
        payload: { searchParams, relevantActiveTags, ...response }
      });
    } :
    (response) => {
      setTimeout(() => onSuccess());

      return dispatch({
        type: 'SHOW_MORE_IMAGES_SUCCESS',
        payload: { searchParams, relevantActiveTags, ...response }
      });
    };

  searchParams.colorFiltersQuery = searchParams.colorFilters
    .map(item => `&colors[]=${item.value}:1`).join('').replace(/#/g, '');

  if (!searchParams.value) {
    return new Promise(resolve => resolve());
  }

  return ImagesAPI.searchImages(searchParams, relevantActiveTags).then(successHandler);
};