import React, { Component } from 'react';
import Radium from 'radium';
import styles from './styles.css';

const STEP = {
  DEFAULT: 'DEFAULT',
  UPLOADING: 'UPLOADING',
  ERROR: 'ERROR',
  UPLOADED: 'UPLOADED',
};

class AirstoreDragDropUploader extends Component {
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
  }

  fileChangeHandler = ({target}) => {
    this.changeFile(target.files);
  }

  changeFile = (files = []) => {
    this.setState({ files });

    setTimeout(() => {
      if (files && this.isFilesValid(files)) this.upload();
    });
  }

  changeStep = step => { this.setState({ step }) }

  upload = (isUploadFromUrl = false, url = null) => {
    if (typeof this.props.onUploaded === 'function') {
      this.changeStep(STEP.UPLOADING);

      (isUploadFromUrl
          ? this.props.onUploaded([url], 'files_url[]')
          : this.props.onUploaded(this.state.files)
      ).then(
        (uploadedFiles = []) => {
          if (uploadedFiles === false) return;

          this.changeStep(STEP.UPLOADED);
          this.setState({ uploadedFiles });
        },
        (error) => {
          this.changeStep(STEP.ERROR);
          this.setState({ errorMsg: error.msg || 'Error' });
        }
      );
    }
    else console.warn('this.props.onUploaded is not defined (AirstoreDragDropUploader)');
  };

  uploadFromWeb = () => {
    const value = this.refs.uploadFromWebField.value;
    const isValid = value && /^(http:\/\/|https:\/\/|\/\/)/.test(value);
    const errorHandler = () => {
      this.changeStep(STEP.ERROR);
      this.setState({ errorMsg: value ? 'URL not valid!' : 'Empty URL!' });
      setTimeout(() => this.changeStep(STEP.DEFAULT), 4000);
    };

    if (isValid) this.upload(true, value);
    else errorHandler();
  };

  render() {
    const { step, uploadedFiles = [], errorMsg = '' } = this.state;

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
            style={[styles.container.uploadBlock, this.state.isDragOver && { background: "rgba(210, 253, 207, 0.5)" }]}
            method={'post'}
            encType="multipart/form-data"
          >

            {
              (step === STEP.DEFAULT || step === STEP.ERROR) &&
              <div style={[styles.container.uploadBlock.inputBox]}>
                <input
                  style={[styles.container.uploadBlock.inputBox.file]}
                  type="file"
                  name="files[]"
                  ref="fileInput"
                  data-multiple-caption="{count} files selected"
                  defaultValue={''}
                  onChange={this.fileChangeHandler}
                />

                <j-label style={[styles.container.uploadBlock.inputBox.label]}>
                  <j-span style={[styles.container.uploadBlock.inputBox.label.dragDropText]}>Drag file here</j-span>
                  <div style={[styles.container.uploadBlock.inputBox.label.orText]}>OR</div>
                  <a
                    style={[styles.container.uploadBlock.inputBox.label.uploadBtn]}
                    onClick={() => { this.refs.fileInput.click() }}
                  >Browse your computer</a>
                  <div style={[styles.container.uploadBlock.inputBox.label.orText]}>OR</div>
                  <div style={[{display: 'flex'}]}>
                    <input
                      type="text"
                      style={[styles.formControl, {border: '1px solid rgb(204, 204, 204)', marginRight: 10, outline: 0}]}
                      placeholder="Enter URL to upload from web"
                      ref="uploadFromWebField"
                      onKeyDown={ev => {
                        const isEnterClick = (ev.which || ev.keyCode) === 13;
                        if (isEnterClick) this.uploadFromWeb();
                      }}
                    />
                    <button
                      style={[styles.container.uploadBlock.inputBox.label.uploadBtn]}
                      onClick={this.uploadFromWeb}
                    >OK</button>
                  </div>
                  <div style={[{"fontSize":"12px","color":"rgb(186, 186, 186)","fontWeight":"200","marginTop":"5px"}]}>
                    Accepted file types: gif, jpeg, png, bmp, ico. Up to 10MB.
                  </div>
                </j-label>

                <div ref="submitBtn" style={[styles.container.uploadBlock.inputBox.submitBtn]} type="submit">Upload</div>
              </div>
            }

            {
              step === STEP.UPLOADING &&
              <div style={[styles.container.uploadBlock.uploadingBox]}>
                <j-i
                  style={[
                    styles.fa, styles.faSpin, styles.faFw,
                    { font: 'normal normal normal 20px/1 FontAwesome'}
                  ]}
                >&#61712;</j-i>
                <j-span>Uploading</j-span>
              </div>
            }

            {
              step === STEP.ERROR &&
              <div style={[styles.container.uploadBlock.errorBox]}>
                <j-span style={[styles.container.uploadBlock.errorBox.errorMsg]}>{errorMsg}</j-span>
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

export default Radium(AirstoreDragDropUploader);