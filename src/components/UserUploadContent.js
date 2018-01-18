import React, { Component } from 'react';
import Radium from 'radium';
import { AirstoreDragDropUploader } from './';


class UserUploadContent extends Component {
  render() {
    return (
      <div style={[{ width: '100%' }]}>
        <AirstoreDragDropUploader onUploaded={this.props.uploadFiles}/>
      </div>
    );
  }
}

export default Radium(UserUploadContent);