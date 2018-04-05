import * as IconAPI from '../services/iconsApi.service';

export const getIconsCategories = () => dispatch =>
  IconAPI.getCategories().then(categories => {
    dispatch({ type: 'ICONS_FETCH_CATEGORIES_SUCCESS', payload: categories });
  });

export const activateIconsCategory = (category, onSuccess) => dispatch => {
  dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

  setTimeout(() => dispatch(fetchIcons(category.slug, 1, '', 60, onSuccess)));
};

export const fetchIcons = (categorySlug = '', page = 1, q = '', limit = 60, onSuccess = () => {}) => dispatch => {
  const successHandler = response => {
    setTimeout(() => onSuccess());
    return dispatch({ type: 'ICONS_FETCH_SUCCESS', payload: {page, q, limit, categorySlug, ...response} });
  }

  switch (categorySlug) {
    case 'custom-famous': return IconAPI.searchIcons(page, '', limit).then(successHandler);
    case 'custom-search':
      dispatch({ type: 'ICONS_CLEAN', payload: null });
      if (!q) {
        return new Promise(resolve => resolve());
      }
      return IconAPI.searchIcons(page, q, limit).then(successHandler);
    default: return IconAPI.getCategoryIcons(categorySlug, page, limit).then(successHandler);
  }
};
