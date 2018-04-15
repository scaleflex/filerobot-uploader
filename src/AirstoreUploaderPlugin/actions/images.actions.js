import * as ImagesAPI from '../services/imagesApi.service';


export const fetchImages = (searchParams, relevantActiveTags, onSuccess = () => {}) => dispatch => {
  const successHandler = response => {
    setTimeout(() => onSuccess());
    return dispatch({
      type: 'IMAGES_FETCH_SUCCESS',
      payload: { searchParams, relevantActiveTags, ...response }
    });
  }

  switch (searchParams.type) {
    case 'all':
      searchParams.typeQuery = '&style[]=FLAT&style[]=MONOCOLOR';
      break;
    case 'multi':
      searchParams.typeQuery = '&style[]=FLAT';
      break;
    case 'mono':
      searchParams.typeQuery = '&style[]=MONOCOLOR';
      break;
  }


  if (!searchParams.value) {
    return new Promise(resolve => resolve());
  }
  return ImagesAPI.searchImages(searchParams, relevantActiveTags).then(successHandler);
};