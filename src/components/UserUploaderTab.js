import React, { Component } from 'react';
import Radium from 'radium';
import {CSS, DragDropCss as styles} from '../assets/styles';
import {connect} from "react-redux";
import {uploadFilesFromUrls, uploadFiles} from '../actions';
import {isEnterClick} from '../utils';

const STEP = {
  DEFAULT: 'DEFAULT',
  UPLOADING: 'UPLOADING',
  ERROR: 'ERROR',
  UPLOADED: 'UPLOADED',
};

class UserUploaderTab extends Component {
  state = {
    step: STEP.DEFAULT,
    errorMsg: '',
    isDragOver: false,
    files: [],
    uploadedFiles: []
  };

  isFilesValid = files => true;

  fileDropHandler = event => {
    event.preventDefault();
    this.changeFile((event.dataTransfer || event.originalEvent.dataTransfer).files);
  };

  fileChangeHandler = ({target}) => {
    this.changeFile(target.files);
  };

  changeFile = (files = []) => {
    this.setState({ files });

    setTimeout(() => {
      if (files && this.isFilesValid(files)) this.upload();
    });
  };

  changeStep = step => this.setState({ step });
  uploadStart = () => this.setState({ step: STEP.UPLOADING });
  uploadSuccess = uploadedFiles => this.setState({ step: STEP.UPLOADED, uploadedFiles });
  uploadError = (msg, timer = null) => {
    this.setState({ step: STEP.ERROR, errorMsg: msg || 'Error' });
    if (timer) setTimeout(() => this.changeStep(STEP.DEFAULT), timer);
  };

  upload = (isUploadFromUrl = false, url = null) => {
    // if (this.state.isLoading) return;

    this.uploadStart();
    (
      isUploadFromUrl
        ? this.props.onFileUploadFromUrl(url, this.props.uploaderConfig)
        : this.props.onFilesUpload(this.state.files, this.props.uploaderConfig)
    ).then(files => this.uploadSuccess(files), error => this.uploadError(error.msg));
  };

  uploadFromWeb = () => {
    const value = this.refs.uploadFromWebField.value;
    const isValid = value && /^(http:\/\/|https:\/\/|\/\/)/.test(value);

    if (isValid) this.upload(true, value);
    else this.uploadError(value ? 'URL not valid!' : 'Empty URL!', 4000);
  };

  render() {
    const { step, uploadedFiles = [], errorMsg = '' } = this.state;
    const uploadBlock_style = styles.container.uploadBlock;

    return (
      <div style={[styles.container]}>
        {
          step !== STEP.UPLOADED &&
          <div
            onDragOver={e => { e.preventDefault(); this.setState({ isDragOver: true }) }}
            onDragEnter={e => { e.preventDefault(); this.setState({ isDragOver: true }) }}
            onDragLeave={e => { e.preventDefault(); this.setState({ isDragOver: false }) }}
            onDragEnd={e => { e.preventDefault(); this.setState({ isDragOver: false }) }}
            onDrop={this.fileDropHandler}
            style={[uploadBlock_style, this.state.isDragOver && { background: "rgba(210, 253, 207, 0.5)" }]}
            method={'post'}
            encType="multipart/form-data"
          >

            {
              (step === STEP.DEFAULT || step === STEP.ERROR) &&
              <div style={[uploadBlock_style.inputBox]}>
                <input
                  style={[uploadBlock_style.inputBox.file]}
                  type="file"
                  name="files[]"
                  ref="fileInput"
                  data-multiple-caption="{count} files selected"
                  defaultValue={''}
                  onChange={this.fileChangeHandler}
                />

                <label style={[uploadBlock_style.inputBox.label]}>
                  <span style={[uploadBlock_style.inputBox.label.dragDropText]}>Drag file here</span>
                  <div style={[uploadBlock_style.inputBox.label.orText]}>OR</div>
                  <button
                    style={[CSS.button, {margin: 'auto'}]}
                    onClick={() => { this.refs.fileInput.click() }}
                  >Browse your computer</button>
                  <div style={[uploadBlock_style.inputBox.label.orText]}>OR</div>
                  <div style={[{display: 'flex'}]}>
                    <input
                      type="text"
                      style={[CSS.field, {width: '100%'}]}
                      placeholder="Enter URL to upload from web"
                      ref="uploadFromWebField"
                      onKeyDown={ev => isEnterClick(ev) && this.uploadFromWeb()}
                    />
                    <button style={[CSS.button]} onClick={this.uploadFromWeb}>OK</button>
                  </div>
                  <div style={[{"fontSize":"12px","color":"rgb(186, 186, 186)","fontWeight":"200","marginTop":"5px"}]}>
                    Accepted file types: gif, jpeg, png, bmp, ico. Up to 10MB.
                  </div>
                </label>

                <div ref="submitBtn" style={[uploadBlock_style.inputBox.submitBtn]} type="submit">Upload</div>
              </div>
            }

            {
              step === STEP.UPLOADING &&
              <div style={[uploadBlock_style.uploadingBox]}>
                <i
                  style={[
                    styles.fa, styles.faSpin, styles.faFw,
                    { font: 'normal normal normal 20px/1 FontAwesome'}
                  ]}
                >&#61712;</i>
                <span>Uploading</span>
              </div>
            }

            {
              step === STEP.ERROR &&
              <div style={[uploadBlock_style.errorBox]}>
                <span style={[uploadBlock_style.errorBox.errorMsg]}>{errorMsg}</span>
              </div>
            }
          </div>
        }

        {
          step === STEP.UPLOADED &&
          <div className="image-wrapper text-center empty-background-image">
            <div className="image-block">
              {
                uploadedFiles.length &&
                <img src={uploadedFiles[0].public_link}/>
              }
            </div>
            <div className="replace-image">
              <a className="replace-image-btn" href="#">Replace image</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  ({uploader: {uploaderConfig}}) => ({uploaderConfig}),
  dispatch => ({
    onFilesUpload: (files, uploaderConfig) => dispatch(uploadFiles(files, uploaderConfig)),
    onFileUploadFromUrl: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig))
  })
)(Radium(UserUploaderTab));