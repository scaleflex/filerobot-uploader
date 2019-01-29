import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { CSS } from '../assets/styles';
import UserUploaderTab from './UploadImagesTab/UserUploaderTab';
import { Dialog } from '../styledComponents';
import { Modal } from './Modal';
import FocusLock from 'react-focus-lock';
import {
  modalClose, modalOpen, activateTab, setUploaderConfig, setUploadHandler
} from '../actions'
import config from '../config';
import { connect } from 'react-redux';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import Nav from './nav/Nav';
import Loadable from 'react-loadable';
import { I18n } from 'react-i18nify';
import { Spinner } from '../components/Spinner';


export const UploadedImagesTab = Loadable({
  loader: () => import(/* webpackChunkName: "gallery" */ './UploadedImagesTab/UploadedImagesTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const IconTab = Loadable({
  loader: () => import(/* webpackChunkName: "icons" */ './IconsTab/IconTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const BackgroundTab = Loadable({
  loader: () => import(/* webpackChunkName: "images" */ './ImagesTab/ImagesTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const TaggingTab = Loadable({
  loader: () => import(/* webpackChunkName: "tagging" */ './TaggingTab/TaggingTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const ImageEditor = Loadable({
  loader: () => import(/* webpackChunkName: "image-editor" */ './imageEditor/ImageEditorWrapper'),
  loading: () => <Spinner overlay show={true}/>
});
const ToastMessageFactory = React.createFactory(ToastMessageAnimated);
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
]

class AirstoreUploader extends Component {
  constructor(props) {
    super();

    const { initialOptions } = props;

    // support old config
    let activeModules = initialOptions.modules || initialOptions.MODULES || config.modules || ["UPLOAD"];
    activeModules = activeModules.join('|').replace('UPLOADED_IMAGES', 'MY_GALLERY').split('|');
    // end

    this.state = {
      activeModules,
      postUpload: false,
      prevTab: 'UPLOAD',
      files: [],
      isTooSmall: window.innerWidth < 685,
      path: ''
    };

    window.AirstoreUploader = window.AirstoreUploader || {};
    window.FilerobotUploader = window.FilerobotUploader || {};
    window.AirstoreUploader.open = this.openModal;
    window.AirstoreUploader.close = this.closeModal;

    window.FilerobotUploader.open = window.AirstoreUploader.open;
    window.FilerobotUploader.close = window.AirstoreUploader.close;
  }

  componentDidMount() {
    let { initialOptions, initialTab } = this.props;
    const language = initialOptions.language || initialOptions.LANGUAGE || config.language;
    initialTab = initialTab || initialOptions.initialTab || initialOptions.INITIAL_TAB || config.initialTab;

    I18n.setLocale(language);
    initialOptions.modules = this.state.activeModules;
    this.props.setUploaderConfig(initialOptions);
    this.props.onSetUploadHandler(initialOptions.onUpload || null);

    if (this.props.opened) this.openModal(initialTab);

    window.onresize = () => {
      const isTooSmall = window.innerWidth < 685;

      if (isTooSmall !== this.state.isTooSmall) {
        this.setState({ isTooSmall });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.opened !== prevProps.opened) {
      if (this.props.opened)
        this.openModal();
      else
        this.closeModal();
    }
  }

  setPostUpload = (value, tabId = '', prevTab = '', nextStateProps) => {
    this.setState({ postUpload: value, prevTab, ...nextStateProps });
    this.props.activateTab(tabId || this.state.prevTab);
  }

  saveUploadedFiles = (files = []) => { this.setState({ files }); }

  openModal = (initialTab, { file } = {}) => {
    let { initialOptions } = this.props;

    initialTab = initialTab || this.props.initialTab ||
      initialOptions.initialTab || initialOptions.INITIAL_TAB || config.initialTab;

    if (file) {
      this.setState({ files: [file], postUpload: true, prevTab: '' }, () => {
        this.props.modalOpen(initialTab || this.props.initialTab);
      });
    } else {
      this.setState({ postUpload: false }, () => {
        this.props.modalOpen(initialTab || this.props.initialTab);
      });
    }
  }

  closeModal = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
    this.props.modalClose();
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

    this.props.activateTab(tabId);
  }

  render() {
    if (!this.props.isVisible) return null;

    const { activeModules, postUpload, files, prevTab, isTooSmall, path } = this.state;
    const { activeTabId, initialOptions } = this.props;
    const contentProps = {
      files,
      prevTab,
      path,

      showAlert: this.showAlert,
      themeColors: initialOptions.themeColors,
      setPostUpload: this.setPostUpload,
      saveUploadedFiles: this.saveUploadedFiles,
      onClose: this.props.onClose
    };
    const filteredTabs = tabs.filter(tab => tab.id && activeModules.includes(tab.id));
    const activeTab = (postUpload ? postUploadTabs : filteredTabs).find(tab => tab.id === activeTabId) || {};
    const isHideHeader = activeTab.id === 'IMAGE_EDITOR';

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
          <StyleRoot className="airstore-root-box" style={{ width: '100%', height: '100%' }}>
            <FocusLock>
              <Dialog role="dialog" className="ae-dialog">
                {!isHideHeader &&
                <div style={[CSS.tabs.header]} className="ae-tabs-header">

                  <Nav
                    tabs={postUpload ? postUploadTabs : filteredTabs}
                    activeTabId={activeTabId}
                    activateTab={this.activateTab}
                  />

                </div>}
                <div style={[CSS.tabs.content, activeTabId === 'ICONS' && { overflow: 'hidden' }]}>
                  {activeTab &&
                  <div style={[{ width: '100%', minWidth: 540, overflow: 'auto' }]}>
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
          </StyleRoot>
          :
          <div>
            {I18n.t('upload.too_small')} <a href="javascript:void(0)" onClick={this.closeModal}>{I18n.t('upload.close')}</a>
          </div>}
      </Modal>
    );
  }
}


export default connect(
  ({
     uploader: { backgrounds, isVisible, activeTabId, uploaderConfig, activeModules }
   }) => ({ backgrounds, isVisible, activeTabId, uploaderConfig, activeModules }),
  {
    onSetUploadHandler: setUploadHandler,
    modalClose,
    setUploaderConfig,
    modalOpen,
    activateTab
  }
)(Radium(AirstoreUploader));