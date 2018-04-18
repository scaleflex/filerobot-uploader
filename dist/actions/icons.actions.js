var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as IconAPI from '../services/iconsApi.service';

export var getIconsTags = function getIconsTags() {
  return function (dispatch) {
    return IconAPI.getTags().then(function (tags) {
      dispatch({ type: 'ICONS_FETCH_TAGS_SUCCESS', payload: tags });
    });
  };
};

export var activateIconsCategory = function activateIconsCategory(category, onSuccess) {
  return function (dispatch) {
    dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

    setTimeout(function () {
      return dispatch(fetchIcons(category.slug, '', onSuccess));
    });
  };
};

export var fetchIcons = function fetchIcons(searchParams, relevantActiveTags) {
  var onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return function (dispatch) {
    var successHandler = !searchParams.offset ? function (response) {
      setTimeout(function () {
        return onSuccess({ payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response) });
      });

      return dispatch({
        type: 'ICONS_FETCH_SUCCESS',
        payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response)
      });
    } : function (response) {
      setTimeout(function () {
        return onSuccess({ payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response) });
      });

      return dispatch({
        type: 'SHOW_MORE_ICONS_SUCCESS',
        payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response)
      });
    };

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
      return new Promise(function (resolve) {
        return resolve();
      });
    }
    return IconAPI.searchIcons(searchParams, relevantActiveTags).then(successHandler);
  };
};