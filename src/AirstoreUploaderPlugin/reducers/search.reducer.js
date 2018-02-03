const initialState = {
  query: null,
  images: []
};


const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SEARCH_FETCH_IMAGES_SUCCESS':
      return _fetchImages(state, payload);
    case 'MODAL_CLOSE':
      return _modalClose(state, payload);
    default:
      return state;
  }
};

const _fetchImages = (state, {images = [], query}) =>
  ({...state, images, query: query || '' });

const _modalClose = (state) => ({...state, query: null, images: []});

export default search;