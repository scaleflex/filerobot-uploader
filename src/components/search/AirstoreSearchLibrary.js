import React, { Component } from 'react';
import Radium from 'radium';
import {uploadFilesFromUrls} from '../../actions';
import { connect } from 'react-redux';

class AirstoreSearchLibrary extends Component {
  state = { isLoading: false, uploadingUuid: null };

  uploadStart = uuid => this.setState({ uploadingUuid: uuid, isLoading: true });

  uploadStop = () => this.setState({ uploadingUuid: null, isLoading: false });

  upload = (bg = {}) => {
    if (this.state.isLoading) return;

    this.uploadStart(bg.uuid);
    this.props.onFileUpload(bg.url_public, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  componentDidMount() {}

  render() {
    const { isLoading, uploadingUuid } = this.state;

    return <div>
      <div>
        <input
          type="search"
          onChange={() => {

          }}
        />
      </div>
      <div style={[{display: 'flex', flexWrap: 'wrap'}]}>
        {/*this.props.backgrounds.map(bg =>
          <div
            style={[
              {width: '16.66%', padding: 1},
              !isLoading && {cursor: 'pointer'},
              isLoading && uploadingUuid === bg.uuid && {cursor: 'progress'},
              isLoading && uploadingUuid !== bg.uuid && {opacity: 0.1}
            ]}
            key={`bg-${bg.uuid}`}
            onClick={this.upload.bind(this, bg)}
          >
            <img src={bg.url_preview} width="100%" height="100%" />
          </div>
        )*/}
      </div>
    </div>
  }
}

export default connect(
  ({uploader: {uploaderConfig}}) => ({uploaderConfig}),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig))
  })
)(Radium(AirstoreSearchLibrary));