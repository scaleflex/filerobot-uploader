import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AirstoreUploaderWrapper, { createAirstoreUploaderStore } from '../react-plugin/components/AirstoreUploaderWrapper';
import { Provider } from 'react-redux';


window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.init = init;

function init(options = {}, isOpened = false) {
  const elementId = options.elementId || options.ELEMENT_ID || 'airstore-uploader';
  const initialTab = options.initialTab || options.INITIAL_TAB || 'UPLOAD';
  let container = document.getElementById(elementId);
  const AirstoreUploaderStore = createAirstoreUploaderStore();

  if (!container) {
    container = document.createElement('div');
    container.id = elementId;

    document.body.appendChild(container);
  }

  options.onUpload = options.onUpload || function() {};

  window.AirstoreUploader.component = Component => {

    return render(
      <AppContainer>
        <Provider store={AirstoreUploaderStore}>
          <Component
            opened={isOpened}
            initialOptions={options}
            initialTab={initialTab}
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


