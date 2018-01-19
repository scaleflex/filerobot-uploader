const defaultCategories = [
  {slug: 'custom-famous', cat: 'Famous'},
  {slug: 'custom-search', cat: 'Search', count: 0}
];

const initialState = {
  active: null,
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
  let {count = 0, icons = [], page = 1, q = ''} = result || {};

  if (active.slug === 'custom-search') {
    // TODO
  }

  Object.assign(active, {count, page, q});
  active.icons = [...(active.icons || []), ...(icons || [])];

  const category = categories.find(_c => _c.slug === active.slug);
  if (category) category.count = count;

  return {...state, active, categories};
};

const _visibilityClose = (state) => ({...state, active: null});

export default icons;