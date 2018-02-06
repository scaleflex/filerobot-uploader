var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as IconAPI from '../services/iconsApi.service';

export var getIconsCategories = function getIconsCategories() {
  return function (dispatch) {
    return IconAPI.getCategories().then(function (categories) {
      dispatch({ type: 'ICONS_FETCH_CATEGORIES_SUCCESS', payload: categories });
    });
  };
};

export var activateIconsCategory = function activateIconsCategory(category) {
  return function (dispatch) {
    dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

    setTimeout(function () {
      return dispatch(fetchIcons(category.slug));
    });
  };
};

export var fetchIcons = function fetchIcons() {
  var categorySlug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60;
  return function (dispatch) {
    var successHandler = function successHandler(response) {
      return dispatch({ type: 'ICONS_FETCH_SUCCESS', payload: _extends({ page: page, q: q, limit: limit, categorySlug: categorySlug }, response) });
    };

    switch (categorySlug) {
      case 'custom-famous':
        return IconAPI.searchIcons(page, '', limit).then(successHandler);
      case 'custom-search':
        if (!q) {
          dispatch({ type: 'ICONS_CLEAN', payload: null });
          return new Promise(function (resolve) {
            return resolve();
          });
        }
        return IconAPI.searchIcons(page, q, limit).then(successHandler);
      default:
        return IconAPI.getCategoryIcons(categorySlug, page, limit).then(successHandler);
    }
  };
};