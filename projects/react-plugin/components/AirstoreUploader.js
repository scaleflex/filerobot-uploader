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


export const UploadedImagesTab = Loadable({
  loader: () => import(/* webpackChunkName: "gallery" */ './UploadedImagesTab/UploadedImagesTab'),
  loading: () => null,
});
export const IconTab = Loadable({
  loader: () => import(/* webpackChunkName: "icons" */ './IconsTab/IconTab'),
  loading: () => null,
});
export const BackgroundTab = Loadable({
  loader: () => import(/* webpackChunkName: "images" */ './ImagesTab/ImagesTab'),
  loading: () => null,
});
export const TaggingTab = Loadable({
  loader: () => import(/* webpackChunkName: "tagging" */ './TaggingTab/TaggingTab'),
  loading: () => null,
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
    id: 'UPLOADED_IMAGES',
    fullName: 'Uploaded Images',
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
  }
]

class AirstoreUploader extends Component {
  constructor(props) {
    super();

    const { initialOptions } = props;

    this.state = {
      activeModules: initialOptions.MODULES || config.MODULES || ["UPLOAD"],
      postUpload: false,
      prevTab: 'UPLOAD',
      files: []
      //files: [
      //  {
      //    "name": "7604fded-7c2d-527d-8d01-fd29bcc8e72f",
      //    "url_permalink": "https://example.api.airstore.io/v1/get/_/f3a71ce1-a0ea-55f3-acc0-8fac56157168/7604fded-7c2d-527d-8d01-fd29bcc8e72f",
      //    "overwrite": true,
      //    "properties": {},
      //    "type": "image/jpeg",
      //    "size": 5409531,
      //    "uuid": "f3a71ce1-a0ea-55f3-acc0-8fac56157168",
      //    "sha1": "28d984bdb40c82e434cd008a1ee9b7042d525dea",
      //    "meta": {},
      //    "url_public": "https://example.airstore.io/your/directory/7604fded-7c2d-527d-8d01-fd29bcc8e72f"
      //  }
      //]
    }
  }

  componentDidMount() {
    const { initialOptions, initialTab } = this.props;
    const options = initialOptions || config || {};

    I18n.setLocale(options.LANGUAGE);
    this.props.setUploaderConfig(options);
    this.props.onSetUploadHandler(initialOptions.onUpload || null);

    if (this.props.opened) this.openModal(initialTab);

    if (this.props.updateState)
      this.props.updateState({
        openAirstoreUploader: this.openModal.bind(this, initialTab),
        closeAirstoreUploader: this.closeModal
      });
  }

  setPostUpload = (value, tabId = '', prevTab = '') => {
    this.setState({ postUpload: value, prevTab });
    this.props.activateTab(tabId || this.state.prevTab);
  }

  saveUploadedFiles = (files = []) => { this.setState({ files }); }

  openModal = (initialTab) => {
    this.props.modalOpen(initialTab || this.props.initialTab);
  }

  closeModal = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
    this.props.modalClose();
  }

  showAlert = (title, msg, type = 'success', timeOut = 4000) => {
    this.refs.container[type](
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

    const { activeModules, postUpload, files } = this.state;
    const { activeTabId, initialOptions } = this.props;
    const contentProps = {
      files,

      showAlert: this.showAlert,
      themeColors: initialOptions.themeColors,
      setPostUpload: this.setPostUpload,
      saveUploadedFiles: this.saveUploadedFiles
    };
    const filteredTabs = tabs.filter(tab => tab.id && activeModules.includes(tab.id));
    const activeTab = (postUpload ? postUploadTabs : filteredTabs).find(tab => tab.id === activeTabId);

    return (
      <Modal noBorder fullScreen={'md'} onClose={this.closeModal} style={{ borderRadius: 5 }}>
        <StyleRoot className="airstore-root-box" style={{ width: '100%', height: '100%' }}>
          <FocusLock>
            <Dialog role="dialog" className="ae-dialog">
              <div style={[CSS.tabs.header]} className="ae-tabs-header">

                <Nav
                  tabs={postUpload ? postUploadTabs : filteredTabs}
                  activeTabId={activeTabId}
                  activateTab={this.activateTab}
                />

              </div>
              <div style={[CSS.tabs.content, activeTabId === 'ICONS' && { overflow: 'hidden' }]}>
                {activeTab &&
                <div style={[{ width: '100%', minWidth: 540, overflow: 'auto' }]}>
                  {activeTab.getContent.call(this, contentProps)}
                </div>}
                <ToastContainer
                  ref="container"
                  toastMessageFactory={ToastMessageFactory}
                  className="toast-top-right"
                />
              </div>
            </Dialog>
          </FocusLock>
        </StyleRoot>
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