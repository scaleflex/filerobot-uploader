import axios from 'axios';

var api_endpoint = 'https://api.imagesearch.rest/v1/';

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

export var search = function search() {
  var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _send(api_endpoint + 'search?q=' + q);
};
// .then(
//   (response) => response
// );