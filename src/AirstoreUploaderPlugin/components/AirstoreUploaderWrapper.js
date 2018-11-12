import React from 'react';
import configureStore from '../module.hot';
import AirstoreUploader from './AirstoreUploader';
import { getReducers } from '../reducers';


export default ({ initialOptions, opened = false, onClose = null, initialTab = null, ...otherProps }) => {
  return (
    <AirstoreUploader
      opened={opened}
      onClose={onClose}
      initialTab={initialTab}
      initialOptions={initialOptions}
      {...otherProps}
    />
  );
}

const createAirstoreUploaderStore = () => configureStore();

export { createAirstoreUploaderStore, getReducers };