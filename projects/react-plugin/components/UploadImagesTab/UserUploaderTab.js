import React, { Component } from 'react';
import { DragDropCss as styles } from '../../assets/styles/index';
import { isEnterClick } from '../../utils/index';
import { SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle } from '../../styledComponents/index';
import { Container, ItemName, BrowseButton } from './UserUploaderTab.styled';
import { Spinner } from '../Spinner';
import { I18n } from 'react-i18nify';
import * as API from '../../services/api.service';


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

  fileChangeHandler = ({ target }) => {
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
    this.setState({ step: STEP.ERROR, errorMsg: msg || I18n.t('upload.error') });
    if (timer) setTimeout(() => this.changeStep(STEP.DEFAULT), timer);
  };

  upload = (isUploadFromUrl = false, url = null) => {
    // if (this.state.isLoading) return;
    const self = this.props;
    const { config } = this.props.appState;
    const files = isUploadFromUrl ? [url] : this.state.files;
    const dataType = isUploadFromUrl ? 'application/json' : 'files[]';

    this.uploadStart();

    API.uploadFiles(files, config, dataType)
      .then(([files, isDuplicate, isReplacingData]) => {
        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        this.uploadSuccess(files);

        if (config.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'UPLOAD');
          return;
        }

        config.uploadHandler(files);
        self.closeModal();
      })
      .catch((error) => {
        this.uploadError(error.msg)
      })
  };

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

  render() {
    const { step, errorMsg = '' } = this.state;
    const uploadBlock_style = styles.container.uploadBlock;

    return (
      <div style={styles.container}>
        {
          step !== STEP.UPLOADED &&
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
                  <SearchTitle show={true}>{I18n.t('upload.drag_file_here')}</SearchTitle>
                  <ItemName>{I18n.t('upload.or')}</ItemName>
                  <BrowseButton
                    key="browse-your-computer"
                    autoFocus={true}
                    onClick={() => { this.fileInput.click() }}
                  >{I18n.t('upload.browse_your_computer')}
                  </BrowseButton>
                  <ItemName pb={'0'}>
                    {I18n.t('upload.or')}
                  </ItemName>
                  <SearchWrapper>
                    <SearchGroup>
                      <InputSearch
                        type="search"
                        innerRef={node => this._uploadFromWebField = node}
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
                  <ItemName pt={'0'}>
                    {I18n.t('upload.accepted_file_types')}
                  </ItemName>
                </div>

                <div ref="submitBtn" className="ae-btn" style={uploadBlock_style.inputBox.submitBtn} type="submit">
                  {I18n.t('upload.upload_btn')}
                </div>
              </div>
            }

            {step === STEP.UPLOADING &&
            <div style={uploadBlock_style.uploadingBox}>
              <Spinner overlay show={true}/>
              <span>{I18n.t('upload.uploading')}</span>
            </div>}

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