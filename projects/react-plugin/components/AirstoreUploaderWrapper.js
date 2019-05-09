import React from 'react';
import AirstoreUploader from './AirstoreUploader';
import AppState from './AppState';
import { ThemeProvider } from 'styled-components';
import { I18n } from 'react-i18nify';
import * as translations from '../assets/translations';
import '../assets/fonts/scaleflex-icon-font.css';
import theme, { colorSchemes } from '../assets/styles/colorScheme';

I18n.setTranslations(translations);

export default (props) => {
  const {
    config = {}, opened = false, onClose = () => {}, initialTab = null, onUpload = () => {}, ...otherProps
  } = props;
  config.colorScheme = config.colorScheme || {};

  const colorTheme = config.colorScheme.active;
  const colors = colorTheme === 'custom' ?
    config.colorScheme[colorTheme] : colorSchemes[colorTheme || 'solarized'];

  return (
    <ThemeProvider theme={{ ...theme, ...colors }}>
      <AppState>
        <AirstoreUploader
          opened={opened}
          onClose={onClose}
          onUpload={onUpload}
          initialTab={initialTab}
          config={config}
          {...otherProps}
        />
      </AppState>
    </ThemeProvider>
  );
}