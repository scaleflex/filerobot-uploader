const initialState = {
  query: null,
  images: [],
  related_tags: [],
  related_top_colors: [],
  tags: []
};


const search = (state = initialState, action) => {
  const { type, payload } = action;

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

const _fetchImages = (state, { searchParams, images = [], count = 0, related_tags = [], related_top_colors = [] }) => (
  {...state, images, count, related_tags, related_top_colors, searchParams }
);

const _showMoreImagesSuccess = (state, { searchParams, images = [], count = 0, related_tags = [], related_top_colors = [] }) => {
  return {...state, images: [...state.images, ...images], count, related_tags, related_top_colors, searchParams };
}

const _fetchImagesTagsSuccess = (state, tags = []) =>
  ({ ...state, tags: [...tags] });

const _modalClose = (state) => ({...state, query: null, images: []});

export default search;