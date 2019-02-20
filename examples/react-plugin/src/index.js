import React, { Component } from 'react';
import { render } from 'react-dom';
import AirstoreUploader from '../../../projects/react-plugin';


const config = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
  uploadParams: { dir:"/demo_filerobot_en" },
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  container: 'scaleflex-tests-v5a'
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
      <div>
        <h1>React Example</h1>
        <button onClick={() => { this.setState({ isShow: true }); }}>Click</button>
        <AirstoreUploader
          opened={this.state.isShow}
          config={config}
          onClose={() => { this.setState({ isShow: false }); }}
          onUpload={(img) => { console.log(img) }}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));