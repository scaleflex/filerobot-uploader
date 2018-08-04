import axios from 'axios';
import { send } from './api.service';
var api_endpoint = 'https://www.openpix.net/v3/';
var backgroundsAPI = 'https://jolipage-public-assets.api.airstore.io/v1/list?dir=/Backgrounds/v1';

var _send = function _send(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "json";
  return new Promise(function (resolve, reject) {

    axios({
      url: url,
      method: method,
      data: data,
      responseType: responseType,
      headers: headers,
      timeout: 30000
    }).then(function (response) {
      var _response$data = response.data,
          data = _response$data === undefined ? {} : _response$data;
      var _data$status = data.status,
          status = _data$status === undefined ? 'error' : _data$status;


      if (status === 'success') {
        resolve(data);

        // store in cache
        if (method.toLowerCase() === 'get') sessionStorage.setItem(url, JSON.stringify(data));
      } else reject(response);
    }, function (_ref) {
      var _ref$data = _ref.data,
          data = _ref$data === undefined ? {} : _ref$data;
      reject(data);
    });
  });
};

export var getBackgrounds = function getBackgrounds() {
  return send('' + backgroundsAPI).then(function (_ref2) {
    var status = _ref2.status,
        _ref2$files = _ref2.files,
        files = _ref2$files === undefined ? [] : _ref2$files;
    return { status: status, files: files };
  });
};

export var searchImages = function searchImages(searchParams) {
  var relevantActiveTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var colorFiltersQuery = searchParams.colorFiltersQuery,
      limit = searchParams.limit,
      offset = searchParams.offset,
      openpixKey = searchParams.openpixKey;

  var splittedString = searchParams.value.trim().split(' ');
  var value = searchParams.value ? '&q[]=' + splittedString.map(function (string) {
    return string.trim();
  }).join('&q[]=') : '';
  var tags = relevantActiveTags.map(function (tag) {
    return '&q[]=' + tag;
  }).join('');
  var limitQuery = '&limit=' + limit;
  var offsetQuery = '&offset=' + offset;
  var key = '&key=' + openpixKey;

  return _send(api_endpoint + 'search?' + value + tags + colorFiltersQuery + limitQuery + offsetQuery + key).then(function (_ref3) {
    var _ref3$related_tags = _ref3.related_tags,
        related_tags = _ref3$related_tags === undefined ? [] : _ref3$related_tags,
        _ref3$related_top_col = _ref3.related_top_colors,
        related_top_colors = _ref3$related_top_col === undefined ? [] : _ref3$related_top_col,
        _ref3$images = _ref3.images,
        images = _ref3$images === undefined ? [] : _ref3$images,
        _ref3$count = _ref3.count,
        count = _ref3$count === undefined ? 0 : _ref3$count;
    return { images: images, count: count, related_tags: related_tags, related_top_colors: related_top_colors };
  });
};

export var getImagesTags = function getImagesTags() {
  return _send(api_endpoint + 'pictures/tags').then(function (_ref4) {
    var tags = _ref4.tags;
    return tags;
  });
};