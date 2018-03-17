import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';

const AirstoreUploaderStore = createStore(reducer, applyMiddleware(thunk));


export default ({initialOptions, opened = false, onClose = null, initialTab = null }) => (
  <Provider store={AirstoreUploaderStore}>
    <AirstoreUploader
      opened={opened}
      onClose={onClose}
      initialTab={initialTab}
      initialOptions={initialOptions}
    />
  </Provider>
)

export { AirstoreUploaderStore };