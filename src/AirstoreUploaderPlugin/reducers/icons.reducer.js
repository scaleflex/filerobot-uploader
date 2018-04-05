const defaultCategories = [
  {slug: 'custom-famous', cat: 'Famous'},
  {slug: 'custom-search', cat: 'Search', count: 0}
];

const initialState = {
  active: {
    slug: 'custom-search',
    icons: []
  },
  categories: [...defaultCategories]
};


const icons = (state = initialState, action) => {
  const { type, payload } = action;

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

const _fetchCategoriesSuccess = (state, categories = []) =>
  ({...state, categories: [...defaultCategories, ...categories] });

const _activateCategory = (state, active = null) =>
  ({...state, active: active && active.slug ? active : null});

const _fetchSuccess = (state, result = {}) => {
  const active = Object.assign({}, state.active || {});
  const categories = Object.assign([], state.categories || []);
  let {count = 0, icons = [], page = 1, q = '', categorySlug} = result || {};

  //let needCancelHandler = false;
  //if (active && active.slug && active.slug !== categorySlug) needCancelHandler = true;
  //if (needCancelHandler) return {...state};

  q = q || '';
  page = +page;
  icons = icons || [];

  let isLastPage = !icons.length || icons.length < result.limit;

  Object.assign(active, {count, q, isLastPage});

  active.icons = active.icons || [];
  active.icons = [...(page > 1 ? active.icons : []), ...icons];

  if (!isLastPage) active.page = page; // don't change page if we have empty icons

  // Update category.count
  const category = categories.find(_c => _c.slug === active.slug);
  if (category) category.count = count;

  return {...state, active, categories};
};

const _iconsClean = (state) => {
  const active = Object.assign({}, state.active || {});
  const categories = [...state.categories];

  Object.assign(active, {page: 0, q: '', icons: [], count: 0});

  const category = categories.find(_c => _c.slug === 'custom-search');
  if (category) category.count = 0;

  return {...state, active, categories};
};

const _visibilityClose = (state) => ({...state, ..._iconsClean(state), active: null});

export default icons;