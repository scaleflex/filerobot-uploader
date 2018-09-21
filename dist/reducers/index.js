import { combineReducers } from 'redux';
import uploader from './uploader.reducer';
import icons from './icons.reducer';
import images from './images.reducer';

export default combineReducers({
  uploader: uploader,
  icons: icons,
  images: images
});

export var getReducers = function getReducers() {
  return [{
    name: 'uploader',
    reducer: uploader
  }, {
    name: 'icons',
    reducer: icons
  }, {
    name: 'images',
    reducer: images
  }];
};