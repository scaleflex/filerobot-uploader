import React, { Component } from 'react';
import Radium from 'radium';
import { AirstoreIconLibrary } from './icon-library';


class IconsContent extends Component {
  render() {
    return (
      <div style={[{ width: '100%' }]}>
        <AirstoreIconLibrary onUploaded={this.props.uploadFiles}/>
      </div>
    );
  }
}

export default Radium(IconsContent);