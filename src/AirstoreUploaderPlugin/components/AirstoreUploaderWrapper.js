import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../module.hot';
import AirstoreUploader from './AirstoreUploader';


export default ({ initialOptions, opened = false, onClose = null, initialTab = null, AirstoreUploaderStore, ...otherProps }) => {
  AirstoreUploaderStore = AirstoreUploaderStore || configureStore();

  return (
    <Provider store={AirstoreUploaderStore}>
      <AirstoreUploader
        opened={opened}
        onClose={onClose}
        initialTab={initialTab}
        initialOptions={initialOptions}
        {...otherProps}
      />
    </Provider>
  );
}

const createAirstoreUploaderStore = () => configureStore();

export { createAirstoreUploaderStore };