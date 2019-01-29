import React from 'react';
import configureStore from '../module.hot';
import AirstoreUploader from './AirstoreUploader';
import { ThemeProvider } from 'styled-components';
import { getReducers } from '../reducers';
import { I18n } from 'react-i18nify';
import * as translations from '../assets/translations';
import '../assets/fonts/scaleflex-icon-font.css';

I18n.setTranslations(translations);

export default ({ initialOptions, opened = false, onClose = () => {}, initialTab = null, ...otherProps }) => {
  return (
    <ThemeProvider theme={initialOptions.colorScheme[initialOptions.colorScheme.active]}>
      <AirstoreUploader
        opened={opened}
        onClose={onClose}
        initialTab={initialTab}
        initialOptions={initialOptions}
        {...otherProps}
      />
    </ThemeProvider>
  );
}

const createAirstoreUploaderStore = () => configureStore();

export { createAirstoreUploaderStore, getReducers };