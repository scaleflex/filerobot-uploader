import "@babel/polyfill";

import React from 'react';
import AirstoreUploader from './AirstoreUploader';
import AppState from './AppState';
import { ThemeProvider } from 'styled-components';
import { I18n } from 'react-i18nify';
import * as translations from '../assets/translations';
import '../assets/fonts/scaleflex-icon-font.css';
import theme, { colorSchemes } from '../assets/styles/colorScheme';

I18n.setTranslations(translations);

export default ({ initialOptions = {}, opened = false, onClose = () => {}, initialTab = null, ...otherProps }) => {
  initialOptions.colorScheme = initialOptions.colorScheme || {};

  const colorTheme = initialOptions.colorScheme.active;
  const colors = colorTheme === 'custom' ?
    initialOptions.colorScheme[colorTheme] : colorSchemes[colorTheme || 'default'];

  return (
    <ThemeProvider theme={{ ...theme, ...colors }}>
      <AppState>
        <AirstoreUploader
          opened={opened}
          onClose={onClose}
          initialTab={initialTab}
          initialOptions={initialOptions}
          {...otherProps}
        />
      </AppState>
    </ThemeProvider>
  );
}