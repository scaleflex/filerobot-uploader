var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as ImagesAPI from '../services/imagesApi.service';

export var getImagesTags = function getImagesTags() {
  return function (dispatch) {
    return ImagesAPI.getImagesTags().then(function (tags) {
      dispatch({ type: 'IMAGES_FETCH_TAGS_SUCCESS', payload: tags });
    });
  };
};

export var fetchImages = function fetchImages(searchParams, relevantActiveTags) {
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