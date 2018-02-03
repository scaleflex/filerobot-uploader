var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  query: null,
  images: []
};

var search = function search() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case 'SEARCH_FETCH_IMAGES_SUCCESS':
      return _fetchImages(state, payload);
    case 'MODAL_CLOSE':
      return _modalClose(state, payload);
    default:
      return state;
  }
};

var _fetchImages = function _fetchImages(state, _ref) {
  var _ref$images = _ref.images,
      images = _ref$images === undefined ? [] : _ref$images,
      query = _ref.query;
  return _extends({}, state, { images: images, query: query || '' });
};

var _modalClose = function _modalClose(state) {
  return _extends({}, state, { query: null, images: [] });
};

export default search;