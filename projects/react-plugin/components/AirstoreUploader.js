import React, { Component, Fragment } from 'react';
import { CSS } from '../assets/styles';
import UserUploaderTab from './UploadImagesTab/UserUploaderTab';
import { Dialog } from '../styledComponents';
import { Modal } from './Modal';
import { prepareConfig } from '../utils/global.utils';
import CONFIG from '../config';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import Nav from './nav/Nav';
import { I18n } from 'react-i18nify';
import { getInitialState } from './AppState';
import { isImage } from '../utils/icons.utils';
import { getTokenSettings } from '../services/api.service';
import { UploadedImagesTab, IconTab, BackgroundTab, TaggingTab, ImageEditor } from './loadable';
import { isDefined } from '../utils';


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
    let { config, initialTab } = this.props;

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
      }
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

    const nextConfig = prepareConfig(config, onUpload);

    getTokenSettings(nextConfig)
      .then(settings => {
        this.props.setAppState(() => ({ ...settings }));
      })
      .catch(error => {
        const response = error && error.response && error.response.data || {};

        this.showAlert(response.msg, response.hint, 'error', 10000);
      });

    this.props.setAppState(() => ({
      config: nextConfig,
      activeModules
    }), callback);
  }

  setPostUpload = (value, tabId = '', prevTab = '', nextStateProps = {}) => {
    const activeTabId = tabId || this.props.appState.prevTab || 'MY_GALLERY';

    this.props.setAppState(() => ({
      activeTabId, prevTab, postUpload: value, ...nextStateProps, modifyURL: !!nextStateProps.modifyURL
    }));
  }

  saveUploadedFiles = (files = []) => { this.props.setAppState(() => ({ files })); }

  openModal = (initialTab, options = {}) => {
    let { config, appState } = this.props;
    const { activeModules } = appState;
    let { file } = options;
    const nextOptions = {
      ...this.props.options,
      ...options,
      closeOnEdit: isDefined(options.closeOnEdit) ? options.closeOnEdit : false,
      closeOnSave: isDefined(options.closeOnSave) ? options.closeOnSave : true
    };

    initialTab = initialTab || this.props.initialTab ||
      config.initialTab || config.INITIAL_TAB || CONFIG.initialTab;
    file = file || this.props.file;

    const isPostUploadTabs = initialTab === 'TAGGING' || initialTab === 'IMAGE_EDITOR';

    file = (isPostUploadTabs && file) ? file : null;

    if (isPostUploadTabs && !file) {
      if (activeModules.includes('UPLOAD')) {
        initialTab = 'UPLOAD';
      } else {
        this.showAlert('Error', 'Cannot open Filerobot Uploader. You did not pass any file to process.')
        return;
      }
    }

    this.props.setAppState((prevState) => ({
      ...(file ? { files: [file], postUpload: true } : { postUpload: false }),
      activeTabId: initialTab || this.props.initialTab,
      isVisible: true,
      prevTab: file ? '' : prevState.prevTab,
      options: nextOptions
    }));
  }

  closeModal = (props) => {
    const { onClose } = this.props;

    if (onClose) onClose(props);

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
    const Toaster = () => (
      <ToastContainer
        ref={node => this.container = node}
        toastMessageFactory={ToastMessageFactory}
        className="toast-top-right"
      />
    );

    if (!this.props.appState.isVisible) return <Toaster/>;

    const { activeTabId, activeModules, postUpload, files, path, options, hasChanged } = this.props.appState;
    const { config } = this.props;
    const isMobile = this.props.appState.config.mobile;
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
      closeModal: this.closeModal,
      isMobile
    };
    const filteredPostUploadTabs = (postUpload && !isMobile ? this.getPostUploadTabs() : [])
      .filter(tab => tab.id && activeModules.includes(tab.id));
    let filteredTabs = tabs.filter(tab => tab.id && activeModules.includes(tab.id));
    let activeTab = (postUpload ? filteredPostUploadTabs : filteredTabs).find(tab => tab.id === activeTabId);
    const isHideHeader = activeTab && (activeTab.id === 'IMAGE_EDITOR');

    if (isMobile) {
      filteredTabs = [tabs.find(tab => tab.id === 'UPLOAD')];
    }

    if (!activeTab) {
      activeTab = (postUpload ? filteredPostUploadTabs : filteredTabs)[0];
    }

    return (
      <Fragment>
        <Modal
          isTooSmall={isMobile}
          noBorder
          fullScreen={'md'}
          onClose={() => { this.closeModal({ hasChanged }); }}
          style={{ borderRadius: 5 }}
          isHideCloseBtn={isHideHeader}
        >
          <div id="filerobot-uploader" className="airstore-root-box" style={{ width: '100%', height: '100%' }}>
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
                  <div style={{ width: '100%', minWidth: isMobile ? 'auto' : 540, overflow: 'auto' }}>
                    {activeTab.getContent.call(this, contentProps)}
                  </div>}
                </div>
              </Dialog>
          </div>
        </Modal>

        <Toaster/>
      </Fragment>
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
    iconClass: 'sfi-airstore-tags',
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
