import React, { Component } from 'react';
import {
  UploadedImages, HeaderWrap, Nav, ButtonSearch, UploadInputBox, SearchGroup, InputSearch, SearchWrapper,
  ButtonClose, ActionButtonsWrapper
} from '../../styledComponents';
import * as API from '../../services/api.service';
import { getListFiles, searchFiles } from '../../services/api.service';
import { Spinner } from '../Spinner';
import UploadedImagesContent from './UploadedImagesContent';
import { isEnterClick } from '../../utils';
import { I18n } from 'react-i18nify';
import { GALLERY_IMAGES_LIMIT } from '../../config';
import FolderManager from './folderManager/FolderManager';
import { PROGRESS_COLORS, ProgressCircle } from '../ProgressCircle';
import SortDropdown from './SortDropdown';
import { validateExtensions } from '../UploadImagesTab/UserUploaderTab.utils';


const STEP = { DEFAULT: 'DEFAULT', UPLOADING: 'UPLOADING', ERROR: 'ERROR', UPLOADED: 'UPLOADED' };

class UploadedImagesTab extends Component {
  constructor(props) {
    super();

    const { path, appState } = props;
    const { path: currentPath, config } = appState;
    const { sortParams, uploadParams } = config;
    this.state = {
      searchPhrase: '',
      isLoading: false,
      imagesIndex: 0,
      searchInputIndex: 0,
      files: [],
      directories: [],
      isShowMoreImages: false,
      showFileManager: false,
      path: currentPath || path || uploadParams.dir,
      progressBar: {
        color: PROGRESS_COLORS.DEFAULT,
        status: 0
      },
      sortParams: {
        field: sortParams.field,
        isUp: sortParams.order === 'asc'
      },
      totalFilesCount: 0,
      imagesIndexWrapper: 0
    }
  }

  componentDidMount() {
    const { path } = this.state;

    this.onGetListFiles(path);
  }

  activateFolder = (path) => {
    this.setState({ files: [], path });
    this.onGetListFiles(path, 0, null, true);
  }

  fileChangeHandler = ({ target }) => {
    const { appState, showAlert } = this.props;
    const { extensions } = appState.config;
    const isValid = validateExtensions(target.files, extensions, showAlert);

    if (isValid) this.changeFile(target.files);
  };

  changeFile = (filesToUpload = []) => {
    this.setState({ filesToUpload });

    setTimeout(() => {
      if (filesToUpload) this.upload();
    });
  };

  upload = (isUploadFromUrl = false, url = null) => {
    const { path } = this.state;
    const self = this.props;
    const config = this.props.appState.config;
    const files = isUploadFromUrl ? [url] : this.state.filesToUpload;
    const dataType = isUploadFromUrl ? 'application/json' : 'files[]';

    this.uploadStart();

    API.uploadFiles({
      files,
      config: { ...config, onUploadProgress: this.onUploadProgress },
      data_type: dataType,
      dir: path,
      showAlert: this.props.showAlert
    })
      .then(([files, isDuplicate, isReplacingData]) => {
        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        this.uploadSuccess(files);

        if (config.tagging.active) {
          this.props.saveUploadedFiles(files);
          this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY', { path });
          return;
        }

        config.uploadHandler(files, { stage: 'upload' });
        self.closeModal();
      })
      .catch(() => {
        this.uploadError();
      })
  };

  changeStep = step => this.setState({ step });

  uploadStart = () => this.setState({ step: STEP.UPLOADING, files: [] });

  uploadSuccess = uploadedFiles => {
    this.setState({ step: STEP.UPLOADED, uploadedFiles, isDragOver: false });
    this.onGetListFiles(this.state.path);
  }

  uploadError = () => {
    this.changeStep(STEP.DEFAULT);
  };

  fileDropHandler = event => {
    event.preventDefault();
    const { appState, showAlert } = this.props;
    const { extensions } = appState.config;
    const files = (event.dataTransfer || event.originalEvent.dataTransfer).files;
    const isValid = validateExtensions(files, extensions, showAlert);

    if (isValid) this.changeFile(files);
  };

  onDragEvent = (event, field, value) => {
    event.preventDefault();
    this.setState({ [field]: value });
  }

  onSearchChange = (event) => {
    this.setState({ searchPhrase: event.target.value });
  }

  onGetListFiles = (dir, offset = 0, resizeOnSuccess, isSort) => {
    const { sortParams, imagesIndex, imagesIndexWrapper } = this.state;
    const { container, uploadKey, baseAPI, platform } = this.props.appState.config;

    this.setState({ isShowMoreImages: !!offset, isLoading: !offset });

    getListFiles({ dir, container, offset, uploadKey, baseAPI, platform, sortParams })
      .then(([files, directories, totalFilesCount]) => {
        const prevFiles = !offset ? [] : this.state.files;

        this.setState({
          files: [...prevFiles, ...files],
          directories: !offset ? directories : this.state.directories,
          isLoading: false,
          isShowMoreImages: false,
          offset,
          totalFilesCount
        }, () => {
          setTimeout(() => {
            if (isSort) {
              this.setState({ imagesIndex: imagesIndex + 1, imagesIndexWrapper: imagesIndexWrapper + 1 });
            } else {
              typeof resizeOnSuccess === 'function' && resizeOnSuccess();
            }
          })
        })
      })
      .catch(() => {
        this.setState({
          files: [],
          isLoading: false,
          isShowMoreImages: false
        });
      });
  }

  search = (offset = 0, resizeOnSuccess) => {
    const { searchPhrase = '', imagesIndex } = this.state;
    const { container, language, uploadKey, baseAPI, platform } = this.props.appState.config;

    if (searchPhrase.length < 2) { this.goToDefaultFolder(); }

    this.setState({
      isShowMoreImages: !!offset,
      isLoading: !offset
    });

    searchFiles({ query: searchPhrase, language, container, baseAPI, platform, offset, uploadKey }).then(([files, totalFilesCount]) => {
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

  forceUpdate = () => {
    this.setState({ files: [] }, () => { this.onGetListFiles(this.state.path); })
  };

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
      this.activateFolder(this.state.path);
    })
  }

  onKeyDownSearch = (event) => {
    if (isEnterClick(event) && (this.state.searchPhrase.length > 1))
      this.search();

    else if (isEnterClick(event) && (this.state.searchPhrase.length === 0))
      this.goToDefaultFolder();
  }

  onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    this.setState({
      progressBar: {
        status: percentCompleted,
        color: percentCompleted > 99 ? PROGRESS_COLORS.SUCCESS : PROGRESS_COLORS.DEFAULT
      }
    });
  }

  applySort = (newSortParams) => {
    const { sortParams, path  } = this.state;
    const nextSortParams = {
      ...(sortParams || {}),
      ...(newSortParams || {})
    };

    this.setState({ sortParams: nextSortParams }, () => {
      this.activateFolder(path);
    });
  }

  render() {
    const {
      isLoading, step, files, isDragOver, imagesIndex, directories, path, searchPhrase = '',
      progressBar: { color, status }, sortParams, imagesIndexWrapper
    } = this.state;
    const { appState: { config }, showAlert } = this.props;
    const { myGallery: { upload: isUpload }, sortParams: { show: showSortBtn }, folderBrowser } = config;
    const isTooShortSearchPhrase = searchPhrase.length < 2;

    return (
      <UploadedImages>
        {isUpload &&
        <UploadInputBox
          type="file"
          name="files[]"
          ref={node => this.fileInput = node}
          data-multiple-caption="{count} files selected"
          defaultValue={''}
          tabIndex={-1}
          multiple
          onChange={this.fileChangeHandler}
        />}

        <HeaderWrap>
          <SearchWrapper>
            <SearchGroup padding={'0px'}>
              <InputSearch
                searchInputIndex={this.state.searchInputIndex}
                type="text"
                ref={node => this._searchInput = node}
                autoFocus={true}
                value={searchPhrase}
                placeholder={I18n.t('file_manager.search_by_file_name_tag_desc')}
                onChange={this.onSearchChange}
                onKeyDown={this.onKeyDownSearch}
              />
              {searchPhrase && <ButtonClose onClick={this.goToDefaultFolder}/>}
              <ButtonSearch
                key="ok"
                disabled={isTooShortSearchPhrase}
                className="ae-btn"
                onClick={() => { this.search(); }}
              >{I18n.t('upload.search')}</ButtonSearch>
            </SearchGroup>
          </SearchWrapper>

          <ActionButtonsWrapper>
            {showSortBtn &&
            <SortDropdown
              applySort={this.applySort}
              sortParams={sortParams}
            />}
            <ButtonSearch
              hide={!isUpload}
              className="ae-btn"
              fullBr={'4px'}
              onClick={() => { this.fileInput.click() }}
            >{I18n.t('file_manager.upload_images')}</ButtonSearch>
          </ActionButtonsWrapper>
        </HeaderWrap>

        {folderBrowser.show &&
        <Nav>
          <FolderManager
            path={path}
            rootDir={folderBrowser.rootFolder}
            folders={directories}
            goToLevelUpFolder={this.goToLevelUpFolder}
            changeFolder={this.activateFolder}
            isLoading={isLoading}
          />
        </Nav>}

        <UploadedImagesContent
          imagesIndexWrapper={imagesIndexWrapper}
          isUpload={isUpload}
          appState={this.props.appState}
          upload={this.upload}
          setAppState={this.props.setAppState}
          imagesIndex={imagesIndex}
          onDragEvent={this.onDragEvent}
          fileDropHandler={this.fileDropHandler}
          isDragOver={isDragOver}
          saveUploadedFiles={this.props.saveUploadedFiles}
          setPostUpload={this.props.setPostUpload}
          files={files}
          closeModal={this.props.closeModal}
          onShowMoreImages={this.onShowMoreImages}
          isShowMoreImages={this.state.isShowMoreImages}
          isLoading={isLoading}
          path={path}
          forceUpdate={this.forceUpdate}
          showAlert={showAlert}
        />

        {step === STEP.UPLOADING && <ProgressCircle {...{ status, color }}/>}

        <Spinner overlay show={isLoading && step !== STEP.UPLOADING}/>
      </UploadedImages>
    )
  }
}

export default UploadedImagesTab;