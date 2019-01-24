import React, { Component } from 'react';
import {
  UploadedImages, HeaderWrap, Nav, NavItem, ButtonSearch, UploadInputBox,
  SearchGroup, InputSearch, SearchWrapper
} from '../../styledComponents/index';
import { getListFiles, searchFiles } from '../../services/api.service';
import { connect } from 'react-redux';
import { uploadFilesToDir, uploadFilesFromUrls, modalClose } from '../../actions';
import { Spinner } from '../Spinner';
import UploadedImagesContent from './UploadedImagesContent';
import { isEnterClick } from '../../utils';
import { I18n } from 'react-i18nify';


const STEP = { DEFAULT: 'DEFAULT', UPLOADING: 'UPLOADING', ERROR: 'ERROR', UPLOADED: 'UPLOADED' };


class UploadedImagesTab extends Component {
  constructor() {
    super();

    this.state = {
      searchPhrase: '',
      activeFolder: null,
      isLoading: false,
      imagesIndex: 0,
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
      this.setState({ files, isLoading: false, imagesIndex: this.state.imagesIndex + 1 });
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
    const self = this.props;

    this.uploadStart();
    (
      isUploadFromUrl
        ? this.props.onFileUploadFromUrl(url, this.props.uploaderConfig)
        : this.props.onFilesUpload(this.state.filesToUpload, this.props.uploaderConfig, 'files[]', activeFolder.dir)
    )
      .then((files) => {
        this.uploadSuccess(files);

        if (this.props.uploaderConfig.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY');
          return;
        }

        self.uploaderConfig.uploadHandler(files);
        self.modalClose();
      })
      .catch((error) => {
        this.uploadError(error.msg)
      })
  };

  changeStep = step => this.setState({ step });

  uploadStart = () => this.setState({ step: STEP.UPLOADING, files: [] });

  uploadSuccess = uploadedFiles => {
    this.setState({ step: STEP.UPLOADED, uploadedFiles, isDragOver: false });
    this.onGetListFiles(this.state.activeFolder.dir);
  }

  uploadError = (msg, timer = null) => {
    this.setState({ step: STEP.ERROR, errorMsg: msg || I18n.t('upload.error') });
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

  search = () => {
    this.setState({ isLoading: true });
    const { searchPhrase = '', imagesIndex } = this.state;
    const { uploaderConfig } = this.props;
    const { container, language } = uploaderConfig;

    searchFiles({ query: searchPhrase, language, container }).then(files => {
      this.setState({ files, isLoading: false, imagesIndex: imagesIndex + 1 });
    })
  }

  render() {
    const { isLoading, step, files, isDragOver, imagesIndex } = this.state;

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

          <SearchWrapper>
            <SearchGroup padding={'0px'}>
              <InputSearch
                type="search"
                innerRef={node => this._searchInput = node}
                autoFocus={true}
                defaultValue={''}
                placeholder={I18n.t('file_manager.search_by_file_name_tag_desc')}
                onKeyDown={ev => isEnterClick(ev) && this.search()}
              />
              <ButtonSearch
                key="ok"
                className="ae-btn"
                onClick={this.search}
              >{I18n.t('upload.search')}</ButtonSearch>
            </SearchGroup>
          </SearchWrapper>

          <ButtonSearch
            className="ae-btn"
            fullBr={'4px'}
            onClick={() => { this.fileInput.click() }}
          >{I18n.t('file_manager.upload_images')}</ButtonSearch>
        </HeaderWrap>

        <UploadedImagesContent
          imagesIndex={imagesIndex}
          onDragEvent={this.onDragEvent}
          fileDropHandler={this.fileDropHandler}
          isDragOver={isDragOver}
          saveUploadedFiles={this.props.saveUploadedFiles}
          setPostUpload={this.props.setPostUpload}
          files={files}
          onClose={this.props.onClose}
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
  {
    onFilesUpload: uploadFilesToDir,
    onFileUploadFromUrl: uploadFilesFromUrls,
    modalClose
  }
)(UploadedImagesTab);