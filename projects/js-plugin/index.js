import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import config from '../react-plugin/config';
import { AppContainer } from 'react-hot-loader';
import AirstoreUploaderWrapper, { createAirstoreUploaderStore } from '../react-plugin/components/AirstoreUploaderWrapper';
import { ThemeProvider } from 'styled-components';
import '../react-plugin/assets/fonts/scaleflex-icon-font.css';
import { Provider } from 'react-redux';
import { dark } from './design';


window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.init = init;

function init(options = {}, isOpened = false) {
  const editor = document.getElementById(options.ELEMENT_ID || 'airstore-uploader');
  const AirstoreUploaderStore = createAirstoreUploaderStore();

  options = Object.assign(config || {}, options || {});
  options.onUpload = options.onUpload || function() {};

  window.AirstoreUploader.component = Component => {

    return render(
      <AppContainer>
        <ThemeProvider theme={dark}>
          <Provider store={AirstoreUploaderStore}>
            <Component
              opened={isOpened}
              initialOptions={options}
              initialTab={options.INITIAL_TAB}
              AirstoreUploaderStore={AirstoreUploaderStore}
            />
          </Provider>
        </ThemeProvider>
      </AppContainer>,
      editor,
    )
  };

  window.AirstoreUploader.component(AirstoreUploaderWrapper);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept(
      './AirstoreUploaderPlugin/components/AirstoreUploaderWrapper',
      () => { render(AirstoreUploaderWrapper); }
    );
  }

  window.AirstoreUploader.init = init;
  window.AirstoreUploader.unmount = () => unmountComponentAtNode(editor);
}


