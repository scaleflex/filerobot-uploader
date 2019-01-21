import React from 'react';
import configureStore from '../module.hot';
import AirstoreUploader from './AirstoreUploader';
import { getReducers } from '../reducers';
import { I18n } from 'react-i18nify';
import * as translations from '../assets/translations';

I18n.setTranslations(translations);

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