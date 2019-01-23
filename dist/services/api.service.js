'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveMetaData = exports.generateTags = exports.searchFiles = exports.getListFiles = exports.uploadFiles = exports.send = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var independentProtocolRegex = /^[https|http]+\:\/\//g;
var getBaseUrl = function getBaseUrl(container) {
  return 'https://' + container + '.api.airstore.io/v1/';
};

var send = exports.send = function send(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "json";
  return (0, _axios2.default)({
    url: url,
    method: method,
    data: data,
    responseType: responseType,
    headers: headers,
    timeout: 30000
  }).then(function (_ref) {
    var _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data;
    return data;
  });
};

/**
 * Send files to airstore storage.
 * We can send 2 types of files:
 *  - files from <input type="file"/>
 *  - files from urls
 * Method understand what files we give via "data_type" attribute.
 *
 * @param uploadPath    {string}  Airstore upload url (like: "//jolipage001.api.airstore.io/upload") or custom handler
 * @param uploadParams  {object}  Params which we need to send to uploadPath
 * @param files         {array}   Array with files
 * @param uploadKey     {string}  = secret key
 * @param data_type     {string}  Available values: "files[]", "files_url[]" (or another if you use custom handler
 *   uploadPath)
 * @param dir     {string}  = directory to upload files
 * @returns {Promise}
 */
var uploadFiles = exports.uploadFiles = function uploadFiles() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref2 = arguments[1];
  var _ref2$uploadPath = _ref2.uploadPath,
      uploadPath = _ref2$uploadPath === undefined ? '' : _ref2$uploadPath,
      _ref2$uploadParams = _ref2.uploadParams,
      uploadParams = _ref2$uploadParams === undefined ? {} : _ref2$uploadParams,
      _ref2$uploadKey = _ref2.uploadKey,
      uploadKey = _ref2$uploadKey === undefined ? '' : _ref2$uploadKey;
  var data_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files[]';
  var dir = arguments[3];

  var url = uploadPath || ''; // use independent protocol
  var ajaxData = new FormData();
  var jsonData = { files_urls: [] };
  var isJson = data_type === 'application/json';

  uploadParams = Object.assign({}, uploadParams, { dir: dir || uploadParams.dir });

  // generate params string
  var paramsStr = Object.keys(uploadParams).filter(function (paramName) {
    return uploadParams[paramName] !== null;
  }) // do not use params with NULL value
  .map(function (paramName) {
    return paramName + '=' + uploadParams[paramName];
  }).join('&');

  if (paramsStr) url += '?' + paramsStr;

  if (files && isJson) {
    [].concat(_toConsumableArray(files)).forEach(function (file) {
      jsonData.files_urls.push(file);
    });
  } else if (files) [].concat(_toConsumableArray(files)).forEach(function (file) {
    return ajaxData.append(data_type, file);
  }); // fill FormData

  return new Promise(function (resolve, reject) {
    send(url, 'POST', isJson ? jsonData : ajaxData, {
      'X-Airstore-Secret-Key': uploadKey,
      'Content-Type': isJson ? 'application/json' : 'multipart/form-data'
    }).then(function (response) {
      var _response$status = response.status,
          status = _response$status === undefined ? 'success' : _response$status,
          _response$files = response.files,
          files = _response$files === undefined ? [] : _response$files,
          file = response.file;


      if (status === 'success' && file) {
        //file.public_link = file.public_link.replace(independentProtocolRegex, '//');

        resolve([file]);
      } else if (status === 'success' && files) {
        resolve(files);
      } else reject(response);
    }).catch(function () {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var data = error.response && error.response.data || {};
      var code = data.code || '';
      var msg = data.msg && (data.msg.join ? data.msg.join(', ') : data.msg);

      alert((code || msg ? code + ': ' + msg : '') || error.msg || error.message);
      reject(error);
    });
  });
};

var getListFiles = exports.getListFiles = function getListFiles(_ref3) {
  var _ref3$dir = _ref3.dir,
      dir = _ref3$dir === undefined ? '' : _ref3$dir,
      _ref3$container = _ref3.container,
      container = _ref3$container === undefined ? '' : _ref3$container;

  var baseUrl = getBaseUrl(container);
  var apiPath = 'list?';
  var directoryPath = dir ? 'dir=' + dir : '';
  var url = [baseUrl, apiPath, directoryPath].join('');

  return send(url).then(function () {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return response.files;
  });
};

var searchFiles = exports.searchFiles = function searchFiles(_ref4) {
  var _ref4$query = _ref4.query,
      query = _ref4$query === undefined ? '' : _ref4$query,
      _ref4$container = _ref4.container,
      container = _ref4$container === undefined ? '' : _ref4$container;

  var baseUrl = getBaseUrl(container);
  var apiPath = 'search?';
  var url = [baseUrl, apiPath, 'q=' + query].join('');

  return send(url).then(function () {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return response.files;
  });
};

var generateTags = exports.generateTags = function generateTags(url, _ref5) {
  var _ref5$key = _ref5.key,
      key = _ref5$key === undefined ? '' : _ref5$key,
      _ref5$provider = _ref5.provider,
      provider = _ref5$provider === undefined ? 'google' : _ref5$provider,
      _ref5$confidence = _ref5.confidence,
      confidence = _ref5$confidence === undefined ? 60 : _ref5$confidence,
      _ref5$limit = _ref5.limit,
      limit = _ref5$limit === undefined ? 10 : _ref5$limit;
  var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  var base = 'https://beta-process.scaleflex.cloud/';

  return send(base + '?key=' + key + '&url=' + url + '&provider=' + provider + '&language=' + language + '&confidence=' + confidence + '&limit=' + limit).then(function () {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return response;
  });
};

var saveMetaData = exports.saveMetaData = function saveMetaData(id, properties, _ref6) {
  var container = _ref6.container;

  var base = 'https://' + container + '.api.airstore.io/file/';
  var data = { properties: properties };

  return send('' + base + id + '/properties', 'PUT', data).then(function () {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return response;
  });
};