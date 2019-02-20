import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AirstoreUploaderWrapper  from '../react-plugin/components/AirstoreUploaderWrapper';


window.AirstoreUploader = window.AirstoreUploader || {};
window.FilerobotUploader = window.FilerobotUploader || {};
window.AirstoreUploader.init = init;
window.FilerobotUploader.init = init;

function init(options = {}, isOpened = false) {
  const elementId = options.elementId || options.ELEMENT_ID || 'airstore-uploader';
  const initialTab = options.initialTab || options.INITIAL_TAB || 'UPLOAD';
  let container = document.getElementById(elementId);

  if (!container) {
    container = document.createElement('div');
    container.id = elementId;

    document.body.appendChild(container);
  }

  options.onUpload = options.onUpload || function() {};

  window.AirstoreUploader.component = Component => {

    return render(
      <AppContainer>
          <Component
            opened={isOpened}
            initialOptions={options}
            initialTab={initialTab}
          />
      </AppContainer>,
      container,
    )
  };


  window.AirstoreUploader.component(AirstoreUploaderWrapper);
  window.AirstoreUploader.unmount = () => unmountComponentAtNode(container);

  window.FilerobotUploader.component = window.AirstoreUploader.component;
  window.FilerobotUploader.unmount = window.AirstoreUploader.unmount;

  return window.AirstoreUploader;
}


