const defaultTags = [
  { slug: 'custom-famous', cat: 'Famous' },
  { slug: 'custom-search', cat: 'Search', count: 0 }
];

const activeDafault = {
  slug: 'custom-search',
  icons: [],
  related_tags: []
};

const initialState = {
  active: activeDafault,
  tags: [...defaultTags]
};

const icons = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ICONS_FETCH_TAGS_SUCCESS':
      return _fetchTagsSuccess(state, payload);
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

const _fetchTagsSuccess = (state, tags = []) =>
  ({ ...state, tags: [...defaultTags, ...tags] });

const _activateCategory = (state, active = activeDafault) =>
  ({ ...state, active: active && active.slug ? active : activeDafault });

const _fetchSuccess = (state, result = {}) => {
  // const active = {};
  //const tags = Object.assign([], state.tags || []);
  let { count = 0, icons = [], related_tags = [] } = result || {};

  //let needCancelHandler = false;
  //if (active && active.slug && active.slug !== categorySlug) needCancelHandler = true;
  //if (needCancelHandler) return {...state};

  //q = q || '';
  //page = +page;
  //icons = icons || [];

  //let isLastPage = !icons.length || icons.length < result.limit;

  //Object.assign(active, {count, q, isLastPage});

  //active.icons = active.icons || [];
  //active.icons = [...(page > 1 ? active.icons : []), ...icons];

  //if (!isLastPage) active.page = page; // don't change page if we have empty icons

  // Update category.count
  //const category = tags.find(_c => _c.slug === active.slug);
  //if (category) category.count = count;

  return { ...state, active: { icons, related_tags }, count };
};

const _iconsClean = (state) => {
  const active = Object.assign({}, state.active || {});
  const tags = [...state.tags];

  Object.assign(active, { page: 0, q: '', icons: [], count: 0 });

  const category = tags.find(_c => _c.slug === 'custom-search');
  if (category) category.count = 0;

  return { ...state, active, tags };
};

const _visibilityClose = (state) => ({ ...state, ..._iconsClean(state), active: activeDafault });

export default icons;