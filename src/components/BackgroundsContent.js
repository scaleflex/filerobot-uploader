import React, { Component } from 'react';
import Radium from 'radium';
import { AirstoreBackgroundLibrary } from './bg-library';


class BackgroundsContent extends Component {
  render() {
    return (
      <div style={[{ width: '100%' }]}>
        <AirstoreBackgroundLibrary/>
      </div>
    );
  }
}

export default Radium(BackgroundsContent);