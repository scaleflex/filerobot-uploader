import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


export default ({initialOptions, opened = false, onClose = null, initialTab = null }) => (
  <Provider store={store}>
    <AirstoreUploader
      opened={opened}
      onClose={onClose}
      initialTab={initialTab}
      initialOptions={initialOptions}
    />
  </Provider>
)

window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.open = tabName => store.dispatch({ type: 'MODAL_OPEN', payload: tabName });