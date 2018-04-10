import * as IconAPI from '../services/iconsApi.service';

export const getIconsCategories = () => dispatch =>
  IconAPI.getCategories().then(categories => {
    dispatch({ type: 'ICONS_FETCH_CATEGORIES_SUCCESS', payload: categories });
  });

export const activateIconsCategory = (category, onSuccess) => dispatch => {
  dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

  setTimeout(() => dispatch(fetchIcons(category.slug, '', onSuccess)));
};

export const fetchIcons = (categorySlug = '', q = '', relevantActiveTags, onSuccess = () => {}) => dispatch => {
  const successHandler = response => {
    setTimeout(() => onSuccess());
    return dispatch({ type: 'ICONS_FETCH_SUCCESS', payload: { q, categorySlug, relevantActiveTags, ...response} });
  }

  switch (categorySlug) {
    case 'custom-famous': return IconAPI.searchIcons('', relevantActiveTags).then(successHandler);
    case 'custom-search':
      //dispatch({ type: 'ICONS_CLEAN', payload: null });
      if (!q) {
        return new Promise(resolve => resolve());
      }
      return IconAPI.searchIcons(q, relevantActiveTags).then(successHandler);
    default: return IconAPI.getCategoryIcons(categorySlug, relevantActiveTags).then(successHandler);
  }
};
