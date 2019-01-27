import React, { Component } from 'react';
import {
  UploadedImages, HeaderWrap, Nav, NavItem, ButtonSearch, UploadInputBox, SearchGroup, InputSearch, SearchWrapper,
  ButtonClose
} from '../../styledComponents';
import { getListFiles, searchFiles } from '../../services/api.service';
import { connect } from 'react-redux';
import { uploadFiles, uploadFilesFromUrls, modalClose } from '../../actions';
import { Spinner } from '../Spinner';
import UploadedImagesContent from './UploadedImagesContent';
import { isEnterClick } from '../../utils';
import { I18n } from 'react-i18nify';
import { GALLERY_IMAGES_LIMIT } from '../../config';
import FolderManager from './folderManager/FolderManager';


const STEP = { DEFAULT: 'DEFAULT', UPLOADING: 'UPLOADING', ERROR: 'ERROR', UPLOADED: 'UPLOADED' };


class UploadedImagesTab extends Component {
  constructor(props) {
    super();

    this.state = {
      searchPhrase: '',
      isLoading: false,
      imagesIndex: 0,
      searchInputIndex: 0,
      files: [],
      directories: [],
      isShowMoreImages: false,
      showFileManager: false,
      path: props.initialDir,
      folderBrowser: props.uploaderConfig.folderBrowser
    };
  }

  componentDidMount() {
    const { path } = this.state;

    this.onGetListFiles(path);
  }

  activateFolder = (path) => {
    this.setState({ files: [], path });
    this.onGetListFiles(path);
  }

  fileChangeHandler = ({ target }) => { this.changeFile(target.files); };

  changeFile = (filesToUpload = []) => {
    this.setState({ filesToUpload });

    setTimeout(() => {
      if (filesToUpload) this.upload();
    });
  };

  upload = (isUploadFromUrl = false, url = null) => {
    const { path } = this.state;
    const self = this.props;

    this.uploadStart();
    (
      isUploadFromUrl
        ? uploadFilesFromUrls(url, this.props.uploaderConfig)
        : uploadFiles(this.state.filesToUpload, this.props.uploaderConfig, 'files[]', path)
    )
      .then(([files, isDuplicate, isReplacingData]) => {
        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

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
    this.onGetListFiles(this.state.path);
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

  onSearchChange = (event) => {
    this.setState({ searchPhrase: event.target.value });
  }

  onGetListFiles = (dir, offset = 0, resizeOnSuccess) => {
    const { uploaderConfig } = this.props;
    const { container } = uploaderConfig;

    this.setState({ isShowMoreImages: !!offset, isLoading: !offset });

    getListFiles({ dir, container, offset }).then(([files, directories, totalFilesCount]) => {
      const prevFiles = !offset ? [] : this.state.files;

      this.setState({
        files: [...prevFiles, ...files],
        directories: !offset ? directories : this.state.directories,
        isLoading: false,
        isShowMoreImages: false,
        offset,
        totalFilesCount
      }, () => {
        typeof resizeOnSuccess === 'function' && resizeOnSuccess();
      })
    })
  }

  search = (offset = 0, resizeOnSuccess) => {
    const { searchPhrase = '', imagesIndex } = this.state;
    const { uploaderConfig } = this.props;
    const { container, language } = uploaderConfig;

    this.setState({
      isShowMoreImages: !!offset,
      isLoading: !offset
    });

    searchFiles({ query: searchPhrase, language, container, offset }).then(([files, totalFilesCount]) => {
      const prevFiles = !offset ? [] : this.state.files;
      const nextOfset = offset;

      this.setState({
        files: [...prevFiles, ...files],
        isLoading: false,
        isShowMoreImages: false,
        totalFilesCount,
        offset,
      }, () => {
        setTimeout(() => {
          this.setState({ imagesIndex: !nextOfset ? imagesIndex + 1 : imagesIndex });
          typeof resizeOnSuccess === 'function' && resizeOnSuccess();
        })
      });
    })
  }

  onShowMoreImages = (resizeOnSuccess) => {
    if (this.state.isShowMoreImages) return;

    if (this.state.searchPhrase) {
      let { totalFilesCount, offset } = this.state;

      if (totalFilesCount > (offset + GALLERY_IMAGES_LIMIT)) {
        offset = offset + GALLERY_IMAGES_LIMIT;

        return this.search(offset, resizeOnSuccess);
      }
    }

    else {
      let { totalFilesCount, offset, path } = this.state;

      if (totalFilesCount > (offset + GALLERY_IMAGES_LIMIT)) {
        offset = offset + GALLERY_IMAGES_LIMIT;

        return this.onGetListFiles(path, offset, resizeOnSuccess);
      }
    }
  }

  goToLevelUpFolder = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { path } = this.state;

    this.activateFolder(path.slice(0, path.lastIndexOf('/')));
  }

  goToDefaultFolder = () => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      searchPhrase: '',
      searchInputIndex: this.state.searchInputIndex + 1
    }, () => {
      this.activateFolder(this.props.initialDir);
    })
  }

  render() {
    const {
      isLoading, step, files, isDragOver, imagesIndex, directories, path, folderBrowser, searchPhrase
    } = this.state;

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
          <Nav>
            {folderBrowser &&
            <FolderManager
              path={path}
              folders={directories}
              goToLevelUpFolder={this.goToLevelUpFolder}
              changeFolder={this.activateFolder}
            />}
          </Nav>

          <SearchWrapper>
            <SearchGroup padding={'0px'}>
              <InputSearch
                searchInputIndex={this.state.searchInputIndex}
                type="search"
                innerRef={node => this._searchInput = node}
                autoFocus={true}
                value={searchPhrase}
                placeholder={I18n.t('file_manager.search_by_file_name_tag_desc')}
                onChange={this.onSearchChange}
                onKeyDown={ev => isEnterClick(ev) && this.search()}
              />
              {searchPhrase && <ButtonClose onClick={this.goToDefaultFolder}/>}
              <ButtonSearch
                key="ok"
                className="ae-btn"
                onClick={() => { this.search(); }}
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
          onShowMoreImages={this.onShowMoreImages}
          isShowMoreImages={this.state.isShowMoreImages}
          isLoading={isLoading}
        />

        <Spinner overlay show={isLoading || (step === STEP.UPLOADING)}/>
      </UploadedImages>
    )
  }
}

const mapStateToProps = state => ({
  uploaderConfig: state.uploader.uploaderConfig,
  initialDir: state.uploader.uploaderConfig.uploadParams.dir
});

export default connect(
  mapStateToProps,
  { modalClose }
)(UploadedImagesTab);