import React, { Component } from 'react';
import { render } from 'react-dom';
import FilerobotUploader from '../../../projects/react-plugin';
import prettyBytes from 'pretty-bytes';


const config = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
  uploadParams: { dir:"/demo_filerobot_en" },
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  container: 'scaleflex-tests-v5a'
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
      initialTab: 'UPLOAD',
      img: null,
      closeOnEdit: false
    }
  }

  render() {
    const { img, initialTab, closeOnEdit } = this.state;

    return (
      <div>
        <h1>React Example</h1>
        <button onClick={() => { this.setState({ isShow: true, initialTab: 'UPLOAD', closeOnEdit: false }); }}>Upload</button>
        <button onClick={() => { this.setState({ isShow: true, initialTab: 'TAGGING', closeOnEdit: true }); }}>Edit</button>

        {img &&
        <div>
          <ul>
            <li>
              <span>File name: </span>
              <span>{img.name}</span>
            </li>
            <li>
              <span>Public link: </span>
              <span>{img.url_public}</span>
            </li>
            <li>
              <span>Size: </span>
              <span>{prettyBytes(img.size || 0)}</span>
            </li>
            <li>
              <span>Description: </span>
              <span>{img.properties.description || ''}</span>
            </li>
            <li>
              <span>Tags: </span>
              <span>{img.properties.tags && img.properties.tags.join(', ')}</span>
            </li>
          </ul>
        </div>}

        <FilerobotUploader
          opened={this.state.isShow}
          initialTab={initialTab}
          file={img}
          config={config}
          options={{ closeOnEdit }}
          onClose={() => { this.setState({ isShow: false }); }}
          onUpload={(images) => { this.setState({ img: images[0] }) }}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));