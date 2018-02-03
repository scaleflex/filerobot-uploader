import { combineReducers } from 'redux';
import uploader from './uploader.reducer';
import icons from './icons.reducer';
import search from './search.reducer';

export default combineReducers({
  uploader: uploader,
  icons: icons,
  search: search
});