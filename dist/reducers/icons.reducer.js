'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultTags = [{ slug: 'custom-famous', cat: 'Famous' }, { slug: 'custom-search', cat: 'Search', count: 0 }];

var activeDafault = {
  slug: 'custom-search',
  icons: [],
  related_tags: []
};

var initialState = {
  active: activeDafault,
  tags: [].concat(defaultTags)
};

var icons = function icons() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case 'ICONS_FETCH_TAGS_SUCCESS':
      return _fetchTagsSuccess(state, payload);
    case 'SHOW_MORE_ICONS_SUCCESS':
      return _showMoreIconsSuccess(state, payload);
    case 'ICONS_ACTIVATE_CATEGORY':
      return _activateCategory(state, payload);
    case 'ICONS_FETCH_SUCCESS':
      return _fetchSuccess(state, payload);
    case 'ICONS_CLEAN':
      return _iconsClean(state, payload);
    case 'MODAL_CLOSE':
      return _visibilityClose(state, payload);
    default:
      return state;
  }
};

var _fetchTagsSuccess = function _fetchTagsSuccess(state) {
  var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _extends({}, state, { tags: [].concat(defaultTags, _toConsumableArray(tags)) });
};

var _activateCategory = function _activateCategory(state) {
  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : activeDafault;
  return _extends({}, state, { active: active && active.slug ? active : activeDafault });
};

var _fetchSuccess = function _fetchSuccess(state) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = result || {},
      _ref$count = _ref.count,
      count = _ref$count === undefined ? 0 : _ref$count,
      _ref$icons = _ref.icons,
      icons = _ref$icons === undefined ? [] : _ref$icons,
      _ref$related_tags = _ref.related_tags,
      related_tags = _ref$related_tags === undefined ? [] : _ref$related_tags,
      searchParams = _ref.searchParams;

  return _extends({}, state, { active: { icons: icons, related_tags: related_tags }, count: count, searchParams: searchParams });
};

var _showMoreIconsSuccess = function _showMoreIconsSuccess(state) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref2 = result || {},
      _ref2$count = _ref2.count,
      count = _ref2$count === undefined ? 0 : _ref2$count,
      _ref2$icons = _ref2.icons,
      icons = _ref2$icons === undefined ? [] : _ref2$icons,
      _ref2$related_tags = _ref2.related_tags,
      related_tags = _ref2$related_tags === undefined ? [] : _ref2$related_tags,
      _ref2$searchParams = _ref2.searchParams,
      searchParams = _ref2$searchParams === undefined ? {} : _ref2$searchParams;

  return _extends({}, state, { active: { icons: [].concat(_toConsumableArray(state.active.icons), _toConsumableArray(icons)), related_tags: related_tags }, count: count, searchParams: searchParams });
};

var _iconsClean = function _iconsClean(state) {
  var active = Object.assign({}, state.active || {});
  var tags = [].concat(_toConsumableArray(state.tags));

  Object.assign(active, { page: 0, q: '', icons: [], count: 0 });

  var category = tags.find(function (_c) {
    return _c.slug === 'custom-search';
  });
  if (category) category.count = 0;

  return _extends({}, state, { active: active, tags: tags });
};

var _visibilityClose = function _visibilityClose(state) {
  return _extends({}, state, _iconsClean(state), { active: activeDafault });
};

exports.default = icons;