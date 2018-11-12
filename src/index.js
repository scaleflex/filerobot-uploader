import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import config from './AirstoreUploaderPlugin/config';
import { AppContainer } from 'react-hot-loader';
import AirstoreUploaderWrapper, { createAirstoreUploaderStore } from './AirstoreUploaderPlugin/components/AirstoreUploaderWrapper';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import { getDesignSystem } from 'scaleflex-react-ui-kit/dist';
import 'scaleflex-react-ui-kit/dist/styledComponents/assets/styles/scaleflex-icon-font.css';
import { Provider } from 'react-redux';


window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.init = init;

function init(options = {}, isOpened = false) {
  const editor = document.getElementById(options.ELEMENT_ID || 'airstore-uploader');
  const AirstoreUploaderStore = createAirstoreUploaderStore();
  window.AirstoreUploader.open = tabName =>
    AirstoreUploaderStore.dispatch({ type: 'MODAL_OPEN', payload: tabName || options.INITIAL_TAB });

  options = Object.assign(config || {}, options || {});
  options.onUpload = options.onUpload || function() {};

  window.AirstoreUploader.component = Component => {

    return render(
      <AppContainer>
        <ThemeProvider theme={getDesignSystem('dark')}>
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

  registerServiceWorker();

  window.AirstoreUploader.init = init;
  window.AirstoreUploader.unmount = () => unmountComponentAtNode(editor);
}


