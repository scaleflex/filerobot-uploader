import * as IconAPI from '../services/iconsApi.service';


export const getIconsCategories = () => dispatch =>
  IconAPI.getCategories().then(categories => {
    dispatch({ type: 'ICONS_FETCH_CATEGORIES_SUCCESS', payload: categories });
  });

export const activateIconsCategory = (category, onSuccess) => dispatch => {
  dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

  setTimeout(() => dispatch(fetchIcons(category.slug, '', onSuccess)));
};

export const fetchIcons = (categorySlug = '', searchParams, relevantActiveTags, onSuccess = () => {}) => dispatch => {
  const successHandler = response => {
    setTimeout(() => onSuccess());
    return dispatch({
      type: 'ICONS_FETCH_SUCCESS',
      payload: { searchParams, categorySlug, relevantActiveTags, ...response }
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


  switch (categorySlug) {
    case 'custom-famous':
      return IconAPI.searchIcons('', relevantActiveTags).then(successHandler);
    case 'custom-search':
      //dispatch({ type: 'ICONS_CLEAN', payload: null });
      if (!searchParams.value) {
        return new Promise(resolve => resolve());
      }
      return IconAPI.searchIcons(searchParams, relevantActiveTags).then(successHandler);
    default:
      return null;
      //return IconAPI.getCategoryIcons(categorySlug, relevantActiveTags).then(successHandler);
  }
};
