const initialState = {
  query: null,
  images: [],
  related_tags: [],
  related_top_colors: []
};


const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'IMAGES_FETCH_SUCCESS':
      return _fetchImages(state, payload);
    case 'MODAL_CLOSE':
      return _modalClose(state, payload);
    default:
      return state;
  }
};

const _fetchImages = (state, { images = [], count = 0, related_tags = [], related_top_colors = [] }) => (
  {...state, images, count, related_tags, related_top_colors }
);

const _modalClose = (state) => ({...state, query: null, images: []});

export default search;