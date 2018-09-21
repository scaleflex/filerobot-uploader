import { combineReducers } from 'redux';
import uploader from './uploader.reducer';
import icons from './icons.reducer';
import images from './images.reducer';

export default combineReducers({
  uploader,
  icons,
  images
});

export const getReducers = () => ([
  {
    name: 'uploader',
    reducer: uploader
  },
  {
    name: 'icons',
    reducer: icons
  },
  {
    name: 'images',
    reducer: images
  }
]);

