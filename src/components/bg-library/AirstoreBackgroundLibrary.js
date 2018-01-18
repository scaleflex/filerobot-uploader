import React, { Component } from 'react';
import Radium from 'radium';
import styles from './styles.css';
import { getBackgrounds } from './api.service';
import { cursorToEnd } from '../../utils';
// import { uploadFromUrl } from "../../actions"; // TODO
import { connect } from "react-redux";

class AirstoreBackgroundLibrary extends Component {
  render() {
    return <div style={[{display: 'flex', flexWrap: 'wrap'}]}>
      {this.props.backgrounds.map(bg =>
        <div
          style={[{width: '20%', padding: 1, cursor: 'pointer'}]}
          key={`bg-${bg.uuid}`}
          onClick={() => {

          }}
        >
          <img src={bg.url_preview} width="100%" height="100%" />
        </div>
      )}
    </div>
  }
}

export default connect(
  ({uploader: {backgrounds}}) => ({backgrounds}),
  dispatch => ({})
)(Radium(AirstoreBackgroundLibrary));