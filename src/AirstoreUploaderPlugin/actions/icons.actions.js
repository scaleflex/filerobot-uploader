import * as IconAPI from '../services/iconsApi.service';


export const getIconsTags = () => dispatch =>
  IconAPI.getTags().then(tags => {
    dispatch({ type: 'ICONS_FETCH_TAGS_SUCCESS', payload: tags });
  });

export const activateIconsCategory = (category, onSuccess) => dispatch => {
  dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

  setTimeout(() => dispatch(fetchIcons(category.slug, '', onSuccess)));
};

export const fetchIcons = (searchParams, relevantActiveTags, onSuccess = () => {}) => dispatch => {
  const successHandler = response => {
    setTimeout(() => onSuccess());
    return dispatch({
      type: 'ICONS_FETCH_SUCCESS',
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
  return IconAPI.searchIcons(searchParams, relevantActiveTags).then(successHandler);
};
