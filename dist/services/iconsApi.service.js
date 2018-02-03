import axios from 'axios';

var api_endpoint = '//api.icons.rest/v1/';

var _send = function _send(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "json";
  return new Promise(function (resolve, reject) {

    // check in cache
    if (method.toLowerCase() === 'get') {
      var cacheResponse = sessionStorage.getItem(url);

      if (cacheResponse) {
        resolve(JSON.parse(cacheResponse));
        return;
      }
    }

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

export var getCategories = function getCategories() {
  return _send(api_endpoint + 'categories').then(function (_ref2) {
    var _ref2$categories = _ref2.categories,
        categories = _ref2$categories === undefined ? [] : _ref2$categories;
    return categories;
  });
};

export var getCategoryIcons = function getCategoryIcons() {
  var category_slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 36;
  return _send(api_endpoint + 'category/' + category_slug + '?limit=' + limit + '&page=' + page).then(function (_ref3) {
    var _ref3$icons = _ref3.icons,
        icons = _ref3$icons === undefined ? [] : _ref3$icons,
        _ref3$count = _ref3.count,
        count = _ref3$count === undefined ? 0 : _ref3$count;
    return { icons: icons || [], count: count };
  });
};

export var searchIcons = function searchIcons() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 36;
  return _send(api_endpoint + 'search?limit=' + limit + '&page=' + page + '&q=' + q).then(function (_ref4) {
    var _ref4$icons = _ref4.icons,
        icons = _ref4$icons === undefined ? [] : _ref4$icons,
        _ref4$count = _ref4.count,
        count = _ref4$count === undefined ? 0 : _ref4$count;
    return { icons: icons || [], count: count };
  });
};