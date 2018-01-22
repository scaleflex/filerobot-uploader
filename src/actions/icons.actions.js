import * as IconAPI from '../services/iconsApi.service';

export const getIconsCategories = () => dispatch =>
  IconAPI.getCategories().then(categories => {
    dispatch({ type: 'ICONS_FETCH_CATEGORIES_SUCCESS', payload: categories });
  });

export const activateIconsCategory = category => dispatch => {
  dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

  setTimeout(() => dispatch(fetchIcons(category.slug)));
};

export const fetchIcons = (categorySlug = '', page = 1, q = '', limit = 36) => dispatch => {
  const successHandler = response => dispatch({ type: 'ICONS_FETCH_SUCCESS', payload: {page, q, limit, ...response} });

  switch (categorySlug) {
    case 'custom-famous': return IconAPI.searchIcons(page, '', limit).then(successHandler);
    case 'custom-search':
      if (!q) {
        dispatch({ type: 'ICONS_CLEAN', payload: null });
        return new Promise(resolve => resolve());
      }
      return IconAPI.searchIcons(page, q, limit).then(successHandler);
    default: return IconAPI.getCategoryIcons(categorySlug, page, limit).then(successHandler);
  }
};
