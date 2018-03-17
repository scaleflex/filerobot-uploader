import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';


export default ({ initialOptions, opened = false, onClose = null, initialTab = null, AirstoreUploaderStore }) => {
  AirstoreUploaderStore = AirstoreUploaderStore || createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={AirstoreUploaderStore}>
      <AirstoreUploader
        opened={opened}
        onClose={onClose}
        initialTab={initialTab}
        initialOptions={initialOptions}
      />
    </Provider>
  );
}

const createAirstoreUploaderStore = () => createStore(reducer, applyMiddleware(thunk));

export { createAirstoreUploaderStore };