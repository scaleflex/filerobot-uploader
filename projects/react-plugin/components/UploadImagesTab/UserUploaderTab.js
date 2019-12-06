import React, { Component, Fragment } from 'react';
import { DragDropCss as styles } from '../../assets/styles/index';
import { isEnterClick } from '../../utils/index';
import { SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle } from '../../styledComponents/index';
import { Container, ItemName, BrowseButton, } from './UserUploaderTab.styled';
import { PROGRESS_COLORS, ProgressCircle } from '../ProgressCircle';
import { I18n } from 'react-i18nify';
import * as API from '../../services/api.service';
import PreUploadProcess from './PreUploadProcess';
import { isImage } from '../../utils/icons.utils';


const STEP = {
  DEFAULT: 'DEFAULT',
  UPLOADING: 'UPLOADING',
  ERROR: 'ERROR',
  UPLOADED: 'UPLOADED',
  PROCESS: 'PROCESS'
};

class UserUploaderTab extends Component {
  state = {
    step: STEP.DEFAULT,
    errorMsg: '',
    isDragOver: false,
    files: [],
    uploadedFiles: [],
    imagesToUpload: [],
    progressBar: {
      color: PROGRESS_COLORS.DEFAULT,
      status: 0
    }
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.props.isMobile) {
        this.fileInput.click();
      }
    });
  }

  fileDropHandler = event => {
    event.preventDefault();
    this.changeFile((event.dataTransfer || event.originalEvent.dataTransfer).files);
  };

  fileChangeHandler = ({ target }) => {
    this.changeFile(target.files);
  };

  changeFile = (files = []) => {
    const { config } = this.props.appState;
    const isAllImages = [].every.call(files, file => file.type && isImage(file.type));
    let count = 0;

    if ((config.preUploadImageProcess || config.processBeforeUpload) && isAllImages) {
      if (!config.processBeforeUpload) this.setState({ files, step: STEP.PROCESS });

      if (files && files[0]) {
        count = files.length;

        [...files].forEach((file, index) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            const { imagesToUpload } = this.state;

            this.setState({
              imagesToUpload: [
                ...imagesToUpload,
                {
                  src: event.target.result,
                  file
                }
              ]
            });

            if (count === index + 1) {
              this.setState({ files, step: STEP.PROCESS });
            }
          }

          reader.readAsDataURL(file);
        });
      }
    } else {
      this.setState({ files }, this.upload);
    }
  };

  changeStep = step => this.setState({ step });

  uploadStart = () => this.setState({ step: STEP.UPLOADING });

  uploadSuccess = uploadedFiles => this.setState({ step: STEP.UPLOADED, uploadedFiles });

  uploadError = (msg, timer = null) => {
    this.setState({ step: STEP.ERROR, errorMsg: msg || I18n.t('upload.error') });
    if (timer) setTimeout(() => this.changeStep(STEP.DEFAULT), timer);
  };

  upload = (isUploadFromUrl = false, url = null) => {
    const self = this.props;
    const { config } = this.props.appState;
    const files = isUploadFromUrl ? [url] : this.state.files;
    const dataType = isUploadFromUrl ? 'application/json' : 'files[]';

    this.uploadStart();

    API.uploadFiles({
      files,
      config: { ...config, onUploadProgress: this.onUploadProgress },
      data_type: dataType,
      showAlert: this.props.showAlert
    })
      .then(([files, isDuplicate, isReplacingData]) => {
        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        this.uploadSuccess(files);

        if (config.tagging.active && !self.isMobile && files.length === 1) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'UPLOAD');
          return;
        }

        config.uploadHandler(files, { stage: 'upload' });
        self.closeModal();
      })
      .catch((error) => {
        this.uploadError(error.msg || error.message);
      })
  };

  onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    this.setState({
      progressBar: {
        status: percentCompleted,
        color: percentCompleted > 99 ? PROGRESS_COLORS.SUCCESS : PROGRESS_COLORS.DEFAULT
      }
    });
  }

  uploadFromWeb = () => {
    const value = this._uploadFromWebField.value;
    const isValid = value && /^(http:\/\/|https:\/\/|\/\/)/.test(value);

    if (isValid) this.upload(true, value);
    else this.uploadError(value ? I18n.t('upload.url_not_valid') : I18n.t('upload.empty_url'), 4000);
  };

  setDragOverOn = e => {
    e.preventDefault();
    this.setState({ isDragOver: true })
  }

  setDragOverOff = e => {
    e.preventDefault();
    this.setState({ isDragOver: false })
  }

  cancelUpload = () => {
    this.setState({
      step: STEP.DEFAULT,
      uploadedFiles: [],
      imagesToUpload: [],
      isDragOver: false
    })
  }

  updateFilesAndUpload = (files) => {
    this.setState({ files }, this.upload);
  }

  updateImagesToUpload = (imagesToUpload, callback) => {
    this.setState(
      { imagesToUpload: [] },
      () => {
        this.setState({ imagesToUpload }, callback)
      }
    );
  }

  render() {
    const { isMobile, appState } = this.props;
    const { step, errorMsg = '', progressBar: { color, status }, imagesToUpload } = this.state;
    const uploadBlock_style = styles.container.uploadBlock;

    return (
      <div style={styles.container}>

        {step === STEP.PROCESS &&
        <PreUploadProcess
          {...{ imagesToUpload }}
          appState={appState}
          upload={this.upload}
          cancelUpload={this.cancelUpload}
          updateFilesAndUpload={this.updateFilesAndUpload}
          updateImagesToUpload={this.updateImagesToUpload}
        />}

        {
          step !== STEP.UPLOADED && step !== STEP.PROCESS &&
          <Container
            onDragOver={this.setDragOverOn}
            onDragEnter={this.setDragOverOn}
            onDragLeave={this.setDragOverOff}
            onDragEnd={this.setDragOverOff}
            onDrop={this.fileDropHandler}
            isDragOver={this.state.isDragOver}
            method={'post'}
            encType="multipart/form-data"
          >
            {
              (step === STEP.DEFAULT || step === STEP.ERROR) &&
              <div style={uploadBlock_style.inputBox}>
                <input
                  style={uploadBlock_style.inputBox.file}
                  type="file"
                  name="files[]"
                  ref={node => this.fileInput = node}
                  data-multiple-caption="{count} files selected"
                  defaultValue={''}
                  tabIndex={-1}
                  multiple={true}
                  onChange={this.fileChangeHandler}
                />

                <div>
                  {!isMobile &&
                  <Fragment>
                    <SearchTitle show={true}>{I18n.t('upload.drag_file_here')}</SearchTitle>
                    <ItemName>{I18n.t('upload.or')}</ItemName>
                  </Fragment>}
                  <BrowseButton
                    key="browse-your-computer"
                    autoFocus={true}
                    onClick={() => { this.fileInput.click() }}
                  >{isMobile ? 'Make a photo or choose from your gallery' : I18n.t('upload.browse_your_computer')}
                  </BrowseButton>
                  {!isMobile &&
                  <Fragment>
                    <ItemName pb={'0'}>
                      {I18n.t('upload.or')}
                    </ItemName>
                    <SearchWrapper>
                      <SearchGroup>
                        <InputSearch
                          type="search"
                          ref={node => this._uploadFromWebField = node}
                          autoFocus={true}
                          defaultValue={''}
                          placeholder={I18n.t('upload.enter_url_to_upload_from_web')}
                          onKeyDown={ev => isEnterClick(ev) && this.uploadFromWeb()}
                        />
                        <ButtonSearch
                          key="ok"
                          className="ae-btn"
                          onClick={this.uploadFromWeb}
                        >{I18n.t('upload.upload_btn')}</ButtonSearch>
                      </SearchGroup>
                    </SearchWrapper>
                  </Fragment>}
                  <ItemName pt={'0'}>
                    {I18n.t('upload.accepted_file_types')}
                  </ItemName>
                </div>

                <div ref="submitBtn" className="ae-btn" style={uploadBlock_style.inputBox.submitBtn} type="submit">
                  {I18n.t('upload.upload_btn')}
                </div>
              </div>
            }

            {step === STEP.UPLOADING && <ProgressCircle {...{ status, color }}/>}

            {step === STEP.ERROR &&
            <div style={uploadBlock_style.errorBox}>
              <span style={uploadBlock_style.errorBox.errorMsg} role="alert">{errorMsg}</span>
            </div>}
          </Container>
        }
      </div>
    );
  }
}

export default UserUploaderTab;