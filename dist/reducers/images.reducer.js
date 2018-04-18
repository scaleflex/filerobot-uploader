var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  query: null,
  images: [],
  related_tags: [],
  related_top_colors: [],
  tags: []
};

var search = function search() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case 'IMAGES_FETCH_SUCCESS':
      return _fetchImages(state, payload);
    case 'MODAL_CLOSE':
      return _modalClose(state, payload);
    case 'IMAGES_FETCH_TAGS_SUCCESS':
      return _fetchImagesTagsSuccess(state, payload);
    case 'SHOW_MORE_IMAGES_SUCCESS':
      return _showMoreImagesSuccess(state, payload);
    default:
      return state;
  }
};

var _fetchImages = function _fetchImages(state, _ref) {
  var searchParams = _ref.searchParams,
      _ref$images = _ref.images,
      images = _ref$images === undefined ? [] : _ref$images,
      _ref$count = _ref.count,
      count = _ref$count === undefined ? 0 : _ref$count,
      _ref$related_tags = _ref.related_tags,
      related_tags = _ref$related_tags === undefined ? [] : _ref$related_tags,
      _ref$related_top_colo = _ref.related_top_colors,
      related_top_colors = _ref$related_top_colo === undefined ? [] : _ref$related_top_colo;
  return _extends({}, state, { images: images, count: count, related_tags: related_tags, related_top_colors: related_top_colors, searchParams: searchParams });
};

var _showMoreImagesSuccess = function _showMoreImagesSuccess(state, _ref2) {
  var searchParams = _ref2.searchParams,
      _ref2$images = _ref2.images,
      images = _ref2$images === undefined ? [] : _ref2$images,
      _ref2$count = _ref2.count,
      count = _ref2$count === undefined ? 0 : _ref2$count,
      _ref2$related_tags = _ref2.related_tags,
      related_tags = _ref2$related_tags === undefined ? [] : _ref2$related_tags,
      _ref2$related_top_col = _ref2.related_top_colors,
      related_top_colors = _ref2$related_top_col === undefined ? [] : _ref2$related_top_col;

  return _extends({}, state, { images: [].concat(_toConsumableArray(state.images), _toConsumableArray(images)), count: count, related_tags: related_tags, related_top_colors: related_top_colors, searchParams: searchParams });
};

var _fetchImagesTagsSuccess = function _fetchImagesTagsSuccess(state) {
  var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _extends({}, state, { tags: [].concat(_toConsumableArray(tags)) });
};

var _modalClose = function _modalClose(state) {
  return _extends({}, state, { query: null, images: [] });
};

export default search;