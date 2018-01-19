import { combineReducers } from 'redux';
import uploader from './uploader.reducer';
import icons from './icons.reducer';

export default combineReducers({
  uploader,
  icons
});

