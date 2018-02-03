var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultCategories = [{ slug: 'custom-famous', cat: 'Famous' }, { slug: 'custom-search', cat: 'Search', count: 0 }];

var initialState = {
  active: null,
  categories: [].concat(defaultCategories)
};

var icons = function icons() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case 'ICONS_FETCH_CATEGORIES_SUCCESS':
      return _fetchCategoriesSuccess(state, payload);
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

var _fetchCategoriesSuccess = function _fetchCategoriesSuccess(state) {
  var categories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _extends({}, state, { categories: [].concat(defaultCategories, _toConsumableArray(categories)) });
};

var _activateCategory = function _activateCategory(state) {
  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return _extends({}, state, { active: active && active.slug ? active : null });
};

var _fetchSuccess = function _fetchSuccess(state) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var active = Object.assign({}, state.active || {});
  var categories = Object.assign([], state.categories || []);

  var _ref = result || {},
      _ref$count = _ref.count,
      count = _ref$count === undefined ? 0 : _ref$count,
      _ref$icons = _ref.icons,
      icons = _ref$icons === undefined ? [] : _ref$icons,
      _ref$page = _ref.page,
      page = _ref$page === undefined ? 1 : _ref$page,
      _ref$q = _ref.q,
      q = _ref$q === undefined ? '' : _ref$q,
      categorySlug = _ref.categorySlug;

  var needCancelHandler = false;
  if (active && active.slug && active.slug !== categorySlug) needCancelHandler = true;
  if (needCancelHandler) return _extends({}, state);

  q = q || '';
  page = +page;
  icons = icons || [];

  var isLastPage = !icons.length || icons.length < result.limit;

  Object.assign(active, { count: count, q: q, isLastPage: isLastPage });

  active.icons = active.icons || [];
  active.icons = [].concat(_toConsumableArray(page > 1 ? active.icons : []), _toConsumableArray(icons));

  if (!isLastPage) active.page = page; // don't change page if we have empty icons

  // Update category.count
  var category = categories.find(function (_c) {
    return _c.slug === active.slug;
  });
  if (category) category.count = count;

  return _extends({}, state, { active: active, categories: categories });
};

var _iconsClean = function _iconsClean(state) {
  var active = Object.assign({}, state.active || {});
  var categories = [].concat(_toConsumableArray(state.categories));

  Object.assign(active, { page: 0, q: '', icons: [], count: 0 });

  var category = categories.find(function (_c) {
    return _c.slug === 'custom-search';
  });
  if (category) category.count = 0;

  return _extends({}, state, { active: active, categories: categories });
};

var _visibilityClose = function _visibilityClose(state) {
  return _extends({}, state, _iconsClean(state), { active: null });
};

export default icons;