import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import config from '../react-plugin/config';
import { AppContainer } from 'react-hot-loader';
import AirstoreUploaderWrapper, { createAirstoreUploaderStore } from '../react-plugin/components/AirstoreUploaderWrapper';
import '../react-plugin/assets/fonts/scaleflex-icon-font.css';
import { Provider } from 'react-redux';


window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.init = init;

function init(options = {}, isOpened = false) {
  let container = document.getElementById(options.ELEMENT_ID || 'airstore-uploader');
  const AirstoreUploaderStore = createAirstoreUploaderStore();

  if (!container) {
    container = document.createElement('div');
    container.id = options.ELEMENT_ID || 'airstore-uploader';

    document.body.appendChild(container);
  }

  options = Object.assign(config || {}, options || {});
  options.onUpload = options.onUpload || function() {};

  window.AirstoreUploader.component = Component => {

    return render(
      <AppContainer>
        <Provider store={AirstoreUploaderStore}>
          <Component
            opened={isOpened}
            initialOptions={options}
            initialTab={options.INITIAL_TAB}
            AirstoreUploaderStore={AirstoreUploaderStore}
          />
        </Provider>
      </AppContainer>,
      container,
    )
  };

  window.AirstoreUploader.component(AirstoreUploaderWrapper);
  window.AirstoreUploader.unmount = () => unmountComponentAtNode(container);
}


