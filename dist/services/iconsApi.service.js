'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSelectionData = exports.setAsNotRelevant = exports.addTag = exports.searchIcons = exports.getTags = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_endpoint = 'https://www.openpix.net/v3/icons';

var _send = function _send(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "json";
  return new Promise(function (resolve, reject) {

    (0, _axios2.default)({
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

var getTags = exports.getTags = function getTags() {
  return _send(api_endpoint + 'tags').then(function (_ref2) {
    var _ref2$tags = _ref2.tags,
        tags = _ref2$tags === undefined ? [] : _ref2$tags;
    return tags;
  });
};

var searchIcons = exports.searchIcons = function searchIcons(searchParams) {
  var relevantActiveTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var typeQuery = searchParams.typeQuery,
      offset = searchParams.offset,
      openpixKey = searchParams.openpixKey;

  var splittedString = searchParams.value.trim().split(' ');
  var value = '&q[]=' + splittedString.map(function (string) {
    return string.trim();
  }).join('&q[]=');
  var tags = relevantActiveTags.map(function (tag) {
    return '&q[]=' + tag;
  }).join('');
  var key = '&key=' + openpixKey;
  var limitQuery = '&limit=250';
  var offsetQuery = '&offset=' + offset;

  return _send(api_endpoint + '?' + value + tags + typeQuery + limitQuery + offsetQuery + key).then(function (_ref3) {
    var _ref3$icons = _ref3.icons,
        icons = _ref3$icons === undefined ? [] : _ref3$icons,
        _ref3$count = _ref3.count,
        count = _ref3$count === undefined ? 0 : _ref3$count,
        related_tags = _ref3.related_tags;
    return { icons: icons || [], count: count, related_tags: related_tags };
  });
};

var addTag = exports.addTag = function addTag(uid, tagName) {
  return _send(api_endpoint + 'retag?uid=' + uid + '&op=ADD&tag=' + tagName);
};

var setAsNotRelevant = exports.setAsNotRelevant = function setAsNotRelevant(searchParams) {
  var relevantActiveTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var uid = arguments[2];

  var splittedString = searchParams.value.trim().split(' ');
  var value = '&q[]=' + splittedString.map(function (string) {
    return string.trim();
  }).join('&q[]=');
  var tags = relevantActiveTags.map(function (tag) {
    return '&q[]=' + tag;
  }).join('');

  return _send(api_endpoint + 'improve/relevancy?' + value + tags + '&uid=' + uid);
};

var sendSelectionData = exports.sendSelectionData = function sendSelectionData(searchParams) {
  var relevantActiveTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var uid = arguments[2];
  var shownIcons = arguments[3];

  var splittedString = searchParams.value.trim().split(' ');
  var value = 'q[]=' + splittedString.map(function (string) {
    return string.trim();
  }).join('&q[]=');
  var tags = relevantActiveTags.map(function (tag) {
    return '&q[]=' + tag;
  }).join('');
  var data = '' + value + tags + '&chosen_uid=' + uid + '&shown_icons_uid[]=' + shownIcons.map(function (icon) {
    return icon.uid;
  }).join('&shown_icons_uid[]=');

  return _send(api_endpoint + 'improve/selection', 'POST', data, {}, 'application/x-www-form-urlencoded');
};