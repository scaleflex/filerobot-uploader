import React, { Component } from 'react';
import {
  UploadedImages, HeaderWrap, Nav, NavItem, ButtonSearch, UploadInputBox
} from '../../styledComponents/index';
import { getListFiles } from '../../services/api.service';
import { connect } from 'react-redux';
import { uploadFilesToDir, uploadFilesFromUrls } from '../../actions';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import UploadedImagesContent from './UploadedImagesContent';

const STEP = { DEFAULT: 'DEFAULT', UPLOADING: 'UPLOADING', ERROR: 'ERROR', UPLOADED: 'UPLOADED' };


class UploadedImagesTab extends Component {
  constructor() {
    super();

    this.state = {
      activeFolder: null,
      isLoading: false,
      files: []
    };
  }

  componentDidMount() {
    const { uploaderConfig } = this.props;
    const { folders } = uploaderConfig;

    if (!folders.length) return;

    const activeFolder = folders[0];

    this.setState({ activeFolder });
    this.onGetListFiles(activeFolder.dir);
  }

  onGetListFiles = (dir) => {
    this.setState({ isLoading: true });
    const { uploaderConfig } = this.props;
    const { container } = uploaderConfig;

    getListFiles({ dir, container }).then(files => {
      this.setState({ files, isLoading: false });
    })
  }

  activateFolder = activeFolder => {
    this.setState({ activeFolder, files: [] });
    this.onGetListFiles(activeFolder.dir);
  }

  fileChangeHandler = ({ target }) => { this.changeFile(target.files); };

  isFilesValid = filesToUpload => true;

  changeFile = (filesToUpload = []) => {
    this.setState({ filesToUpload });

    setTimeout(() => {
      if (filesToUpload && this.isFilesValid(filesToUpload)) this.upload();
    });
  };

  upload = (isUploadFromUrl = false, url = null) => {
    // if (this.state.isLoading) return;
    const { activeFolder } = this.state;

    this.uploadStart();
    (
      isUploadFromUrl
        ? this.props.onFileUploadFromUrl(url, this.props.uploaderConfig)
        : this.props.onFilesUpload(this.state.filesToUpload, this.props.uploaderConfig, 'files[]', activeFolder.dir)
    ).then(filesToUpload => this.uploadSuccess(filesToUpload), error => this.uploadError(error.msg));
  };

  changeStep = step => this.setState({ step });

  uploadStart = () => this.setState({ step: STEP.UPLOADING, files: [] });

  uploadSuccess = uploadedFiles => {
    this.setState({ step: STEP.UPLOADED, uploadedFiles, isDragOver: false });
    this.onGetListFiles(this.state.activeFolder.dir);
  }

  uploadError = (msg, timer = null) => {
    this.setState({ step: STEP.ERROR, errorMsg: msg || 'Error' });
    if (timer) setTimeout(() => this.changeStep(STEP.DEFAULT), timer);
  };

  fileDropHandler = event => {
    event.preventDefault();
    this.changeFile((event.dataTransfer || event.originalEvent.dataTransfer).files);
  };

  onDragEvent = (event, field, value) => {
    event.preventDefault();
    this.setState({ [field]: value });
  }

  render() {
    const { isLoading, step, files, isDragOver } = this.state;

    return (
      <UploadedImages>
        <UploadInputBox
          type="file"
          name="files[]"
          innerRef={node => this.fileInput = node}
          data-multiple-caption="{count} files selected"
          defaultValue={''}
          tabIndex={-1}
          multiple
          onChange={this.fileChangeHandler}
        />

        <HeaderWrap>
          {this.renderNavigation()}

          <ButtonSearch
            fullBr={'4px'}
            onClick={() => { this.fileInput.click() }}
          >Upload images</ButtonSearch>
        </HeaderWrap>

        <UploadedImagesContent
          onDragEvent={this.onDragEvent}
          fileDropHandler={this.fileDropHandler}
          isDragOver={isDragOver}
          files={files}
        />

        <Spinner overlay show={isLoading || (step === STEP.UPLOADING)}/>
      </UploadedImages>
    )
  }

  renderNavigation = () => {
    const { uploaderConfig } = this.props;
    const { activeFolder = {} } = this.state;
    const { folders } = uploaderConfig;

    if (!folders.length) return;

    return (
      <Nav>
        {folders.map(folder => (
          <NavItem
            role="menuitem"
            tabIndex={0}
            onKeyDown={event => { event.keyCode === 13 && this.activateFolder(folder); }}
            onClick={this.activateFolder.bind(this, folder)}
            active={folder.dir === (activeFolder && activeFolder.dir)}
            key={folder.dir}
          >{folder.label}</NavItem>
        ))}
      </Nav>
    )
  }
}

export default connect(
  ({ uploader: { uploaderConfig } }) => ({ uploaderConfig }),
  dispatch => ({
    onFilesUpload: (files, uploaderConfig, dataType, dir) => dispatch(uploadFilesToDir(files, uploaderConfig, dataType, dir)),
    onFileUploadFromUrl: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig))
  })
)(UploadedImagesTab);