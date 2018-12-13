'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIcons = exports.activateIconsCategory = exports.getIconsTags = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _iconsApi = require('../services/iconsApi.service');

var IconAPI = _interopRequireWildcard(_iconsApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getIconsTags = exports.getIconsTags = function getIconsTags() {
  return function (dispatch) {
    return IconAPI.getTags().then(function (tags) {
      dispatch({ type: 'ICONS_FETCH_TAGS_SUCCESS', payload: tags });
    });
  };
};

var activateIconsCategory = exports.activateIconsCategory = function activateIconsCategory(category, onSuccess) {
  return function (dispatch) {
    dispatch({ type: 'ICONS_ACTIVATE_CATEGORY', payload: category });

    setTimeout(function () {
      return dispatch(fetchIcons(category.slug, '', onSuccess));
    });
  };
};

var fetchIcons = exports.fetchIcons = function fetchIcons(searchParams, relevantActiveTags) {
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