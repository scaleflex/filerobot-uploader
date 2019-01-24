import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { injectAsyncReducer } from './store';
import { getReducers, AirstoreUploader } from '../../../projects/react-plugin';


export const store = configureStore();
const AsyncReducer = getReducers();

injectAsyncReducer(store, AsyncReducer);

const AIRSTORE_CONFIG = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY'], // optional default: 'UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY'
  uploadParams: {                 // optional default: {}
    dir: '/dima_test_2'
  },
  // elementID: 'airstore-uploader', // optional default : 'airstore-uploader'
  folders: [                             // required if MY_GALLERY is set
    { dir: '/dima_test_2', label: 'All' },
    //{ dir: '/company_test/project_test', label: 'Project' }
  ],
  airstoreUploadKey: '0cbe9ccc4f164bf8be26bd801d53b132', // required
  openpixKey: 'xxxxxxxxxxxxxxx',                          // required if ICONS_GALLERY et IMAGES_GALLERY
  container: 'example',                           // required
  initialTab: 'UPLOAD',                          // optional   default first module
  tagging: {
    active: true,
    auto_tagging: true,
    provider: 'google', // google|imagga
    confidence: 60, //  [0..100]
    limit: 10,
    key: 'aaaa'
  },
  language: 'en',
  onUpload: (img) => { console.log(img) }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>React Example</h1>
          <button onClick={() => { this.setState({ isShow: true }); }}>Click</button>
          <AirstoreUploader
            opened={this.state.isShow}
            initialOptions={AIRSTORE_CONFIG}
            onClose={() => { this.setState({ isShow: false }); }}
          />
        </div>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'));