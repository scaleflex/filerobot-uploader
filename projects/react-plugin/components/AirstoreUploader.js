import React, { Component } from 'react';
import { CSS } from '../assets/styles';
import UserUploaderTab from './UploadImagesTab/UserUploaderTab';
import { Dialog } from '../styledComponents';
import { Modal } from './Modal';
import FocusLock from 'react-focus-lock';
import { prepareConfig } from '../utils/global.utils';
import CONFIG from '../config';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import Nav from './nav/Nav';
import { I18n } from 'react-i18nify';
import { getInitialState } from './AppState';
import { isImage } from '../utils/icons.utils';
import { UploadedImagesTab, IconTab, BackgroundTab, TaggingTab, ImageEditor } from './loadable';


const ToastMessageFactory = React.createFactory(ToastMessageAnimated);

class AirstoreUploader extends Component {
  constructor() {
    super();

    window.AirstoreUploader = window.AirstoreUploader || {};
    window.FilerobotUploader = window.FilerobotUploader || {};
    window.AirstoreUploader.open = this.openModal;
    window.AirstoreUploader.close = this.closeModal;

    window.FilerobotUploader.open = window.AirstoreUploader.open;
    window.FilerobotUploader.close = window.AirstoreUploader.close;
  }

  componentDidMount() {
    let { initialTab } = this.props;

    initialTab = initialTab || config.initialTab || config.INITIAL_TAB || CONFIG.initialTab;

    if (this.props.opened) {
      this.init(() => { this.openModal(initialTab); });
    } else {
      this.init();
    }

    window.onresize = () => {
      const isTooSmall = window.innerWidth < 685;

      if (isTooSmall !== this.props.appState.isTooSmall) {
        this.props.setAppState(() => ({ isTooSmall }));
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.opened !== prevProps.opened) {
      if (this.props.opened) {
        this.init(this.openModal);
      } else
        this.closeModal();
    }
  }

  init(callback = () => {}) {
    let { config, onUpload } = this.props;
    const language = config.language || config.LANGUAGE || CONFIG.language;

    // support old config
    let activeModules = config.modules || config.MODULES || CONFIG.modules || ["UPLOAD"];
    activeModules = activeModules.join('|').replace('UPLOADED_IMAGES', 'MY_GALLERY').split('|');
    // end

    I18n.setLocale(language);
    config.modules = activeModules;

    this.props.setAppState(() => ({
      config: prepareConfig(config, onUpload),
      activeModules
    }), callback);
  }

  setPostUpload = (value, tabId = '', prevTab = '', nextStateProps = {}) => {
    const activeTabId = tabId || this.props.appState.prevTab || 'MY_GALLERY';

    this.props.setAppState(() => ({
      activeTabId, prevTab, postUpload: value, ...nextStateProps
    }));
  }

  saveUploadedFiles = (files = []) => { this.props.setAppState(() => ({ files })); }

  openModal = (initialTab, { file, closeOnEdit } = {}) => {
    let { config } = this.props;
    let options = {
      ...this.props.options
    };

    options.closeOnEdit = closeOnEdit || options.closeOnEdit || false;

    initialTab = initialTab || this.props.initialTab ||
      config.initialTab || config.INITIAL_TAB || CONFIG.initialTab;
    file = file || this.props.file;

    const isPostUploadTabs = initialTab === 'TAGGING' || initialTab === 'IMAGE_EDITOR';

    initialTab = (isPostUploadTabs && file) ? initialTab : 'UPLOAD';
    file = (isPostUploadTabs && file) ? file : null;

    this.props.setAppState((prevState) => ({
      ...(file ? { files: [file], postUpload: true } : { postUpload: false }),
      activeTabId: initialTab || this.props.initialTab,
      isVisible: true,
      prevTab: file ? '' : prevState.prevTab,
      options
    }));
  }

  closeModal = () => {
    const { onClose } = this.props;

    if (onClose) onClose();

    this.props.setAppState(getInitialState);
  }

  showAlert = (title, msg, type = 'success', timeOut = 4000) => {
    this.container[type](
      msg,
      title, {
        timeOut,
        extendedTimeOut: 2000,
        showAnimation: `animated fadeIn`,
        hideAnimation: `animated fadeOut`
      });
  }

  activateTab = (event, tabId) => {
    event.preventDefault();

    this.props.setAppState(
      () => ({
        prevTab: this.props.appState.activeTabId,
        activeTabId: tabId
      })
    );
  }

  getPostUploadTabs = () => {
    const { files = [] } = this.props.appState;
    const fileType = files[0] && files[0].type;
    const isImageType = isImage(fileType);

    if (!isImageType)
      return postUploadTabs.filter(tab => tab.id !== 'IMAGE_EDITOR');
    else
      return postUploadTabs;
  }

  render() {
    if (!this.props.appState.isVisible) return null;

    const { isTooSmall, activeTabId, activeModules, postUpload, files, path, options } = this.props.appState;
    const { config } = this.props;
    const contentProps = {
      files,
      path,
      options,
      appState: this.props.appState,
      setAppState: this.props.setAppState,
      showAlert: this.showAlert,
      themeColors: config.themeColors,
      setPostUpload: this.setPostUpload,
      saveUploadedFiles: this.saveUploadedFiles,
      closeModal: this.closeModal
    };
    const filteredPostUploadTabs = postUpload ? this.getPostUploadTabs() : [];
    const filteredTabs = tabs.filter(tab => tab.id && activeModules.includes(tab.id));
    const activeTab = (postUpload ? filteredPostUploadTabs : filteredTabs).find(tab => tab.id === activeTabId);
    const isHideHeader = activeTab && (activeTab.id === 'IMAGE_EDITOR');

    return (
      <Modal
        isTooSmall={isTooSmall}
        noBorder
        fullScreen={'md'}
        onClose={this.closeModal}
        style={{ borderRadius: 5 }}
        isHideCloseBtn={isHideHeader}
      >
        {!isTooSmall ?
          <div className="airstore-root-box" style={{ width: '100%', height: '100%' }}>
            <FocusLock>
              <Dialog role="dialog" className="ae-dialog">
                {!isHideHeader &&
                <div style={CSS.tabs.header} className="ae-tabs-header">

                  <Nav
                    tabs={postUpload ? filteredPostUploadTabs : filteredTabs}
                    activeTabId={activeTabId}
                    activateTab={this.activateTab}
                  />

                </div>}
                <div style={{ ...CSS.tabs.content, ...(activeTabId === 'ICONS' && { overflow: 'hidden' }) }}>
                  {activeTab &&
                  <div style={{ width: '100%', minWidth: 540, overflow: 'auto' }}>
                    {activeTab.getContent.call(this, contentProps)}
                  </div>}
                  <ToastContainer
                    ref={node => this.container = node}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                  />
                </div>
              </Dialog>
            </FocusLock>
          </div>
          :
          <div>
            {I18n.t('upload.too_small')} <a href="javascript:void(0)"
                                            onClick={this.closeModal}>{I18n.t('upload.close')}</a>
          </div>}
      </Modal>
    );
  }
}

const tabs = [
  {
    id: 'UPLOAD',
    fullName: 'Upload',
    shortName: 'upload.tab_title',
    iconClass: 'sfi-airstore-upload',
    getContent: (props) => <UserUploaderTab {...props}/>
  },
  {
    id: 'MY_GALLERY',
    fullName: 'My Gallery',
    shortName: 'file_manager.tab_title',
    iconClass: 'sfi-airstore-uploaded-images',
    getContent: (props) => <UploadedImagesTab {...props}/>
  },
  {
    id: 'ICONS_GALLERY',
    fullName: 'Icons Gallery',
    shortName: 'icons.tab_title',
    iconClass: 'sfi-airstore-gallery',
    getContent: (props) => <IconTab {...props}/>
  },
  {
    id: 'IMAGES_GALLERY',
    fullName: 'Images Gallery',
    shortName: 'images.tab_title',
    iconClass: 'sfi-airstore-image-gallery',
    getContent: (props) => <BackgroundTab {...props}/>
  }
];
const postUploadTabs = [
  {
    id: 'TAGGING',
    fullName: 'TAGGING',
    shortName: 'tagging.tab_title',
    iconClass: 'sfi-airstore-tagging',
    getContent: (props) => <TaggingTab {...props}/>
  },
  {
    id: 'IMAGE_EDITOR',
    fullName: 'IMAGE EDITOR',
    shortName: 'upload.image_editor',
    iconClass: 'sfi-airstore-image-editor',
    getContent: (props) => <ImageEditor {...props}/>
  }
];

export default AirstoreUploader;