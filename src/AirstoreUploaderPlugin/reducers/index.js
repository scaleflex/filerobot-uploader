import { combineReducers } from 'redux';
import uploader from './uploader.reducer';
import icons from './icons.reducer';
import images from './images.reducer';

export default combineReducers({
  uploader,
  icons,
  images
});

