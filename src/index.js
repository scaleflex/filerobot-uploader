import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import AirstoreUploader from './components/AirstoreUploader';
import config from './config';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.init = init;

function init(options = {}) {
  const editor = document.querySelector('airstore-uploader');
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

  options = Object.assign({}, config || {}, options || {});

  options.modules = options.modules || [];
  options.settings = Object.assign({}, config.settings || {}, options.settings || {});
  options.settings.uploadPath = options.settings.uploadPath || null;
  options.settings.uploadParams = options.settings.uploadParams || {};
  options.settings.uploadParams.opt_auth_upload_key = options.settings.uploadParams.opt_auth_upload_key || null;
  options.on_upload = options.on_upload || function(files = []) {
    const [file] = files;
    const result = document.querySelector('.result');

    if (result) result.innerHTML = JSON.stringify(file || {}, null, 2);
  };

  // window.AirstoreUploader = render(<AirstoreUploader initialOptions={options} />, editor);

  window.AirstoreUploader = render(
    <Provider store={store}>
      <AirstoreUploader initialOptions={options} />
    </Provider>,
    editor
  );

  window.AirstoreUploader.init = init;
  window.AirstoreUploader.open = () => store.dispatch({type: 'MODAL_OPEN'});
  window.AirstoreUploader.unmount = () => unmountComponentAtNode(editor);
}
