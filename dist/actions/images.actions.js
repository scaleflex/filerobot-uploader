'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchImages = exports.getImagesTags = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _imagesApi = require('../services/imagesApi.service');

var ImagesAPI = _interopRequireWildcard(_imagesApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getImagesTags = exports.getImagesTags = function getImagesTags() {
  return function (dispatch) {
    return ImagesAPI.getImagesTags().then(function (tags) {
      dispatch({ type: 'IMAGES_FETCH_TAGS_SUCCESS', payload: tags });
    });
  };
};

var fetchImages = exports.fetchImages = function fetchImages(searchParams, relevantActiveTags) {
  var onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return function (dispatch) {
    var successHandler = !searchParams.offset ? function (response) {
      setTimeout(function () {
        return onSuccess();
      });

      return dispatch({
        type: 'IMAGES_FETCH_SUCCESS',
        payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response)
      });
    } : function (response) {
      setTimeout(function () {
        return onSuccess();
      });

      return dispatch({
        type: 'SHOW_MORE_IMAGES_SUCCESS',
        payload: _extends({ searchParams: searchParams, relevantActiveTags: relevantActiveTags }, response)
      });
    };

    searchParams.colorFiltersQuery = searchParams.colorFilters.map(function (item) {
      return '&colors[]=' + item.value + ':1';
    }).join('').replace(/#/g, '');

    if (!searchParams.value && !searchParams.colorFilters.length) {
      return new Promise(function (resolve) {
        return resolve();
      });
    }

    return ImagesAPI.searchImages(searchParams, relevantActiveTags).then(successHandler);
  };
};