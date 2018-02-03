import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


export default (options) => (
  <Provider store={store}>
    <AirstoreUploader initialOptions={options} />
  </Provider>
)

window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.open = () => store.dispatch({type: 'MODAL_OPEN'});