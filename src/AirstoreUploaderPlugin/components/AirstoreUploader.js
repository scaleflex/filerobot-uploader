import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { CSS } from '../assets/styles';
import { IconTab, BackgroundTab, UserUploaderTab, SearchTab, UploadedImagesTab } from './index';
import { Modal } from 'scaleflex-react-ui-kit/dist';
import FocusLock from 'react-focus-lock';
import {
  modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules, setUploadHandler, setTabs
} from '../actions'
import config from '../config';
import { connect } from 'react-redux';


class AirstoreUploader extends Component {
  tabs = [
    {
      id: 'UPLOAD',
      fullName: 'Upload',
      shortName: 'Upload',
      iconClass: 'sfi-airstore-upload',
      getContent: () => <UserUploaderTab/>
    },
    {
      id: 'UPLOADED_IMAGES',
      fullName: 'Uploaded Images',
      shortName: 'Uploaded Images',
      iconClass: 'sfi-airstore-uploaded-images',
      getContent: () => <UploadedImagesTab/>
    },
    // {
    //   id: 'SEARCH',
    //   fullName: 'Search',
    //   shortName: 'Search',
    //   iconClass: 'sfi-airstore-search',
    //   getContent: () => <SearchTab/>
    // },
    {
      id: 'ICONS_GALLERY',
      fullName: 'Icons Gallery',
      shortName: 'Icons Gallery',
      iconClass: 'sfi-airstore-gallery',
      getContent: () => <IconTab/>
    },
    {
      id: 'IMAGES_GALLERY',
      fullName: 'Images Gallery',
      shortName: 'Images Gallery',
      iconClass: 'sfi-airstore-image-gallery',
      getContent: () => <BackgroundTab/>
    }
  ];

  componentDidMount() {
    const { initialOptions, initialTab } = this.props;

    this.props.onSetUploaderConfig(initialOptions || config || {});
    this.props.onSetActiveModules(initialOptions.MODULES || config.MODULES || []);
    this.props.onSetUploadHandler(initialOptions.onUpload || null);
    this.props.onSetTabs(this.tabs);
    if (this.props.opened) this.openModal(initialTab);

    if (this.props.updateState)
      this.props.updateState({
        openAirstoreUploader: this.openModal.bind(this, initialTab),
        closeAirstoreUploader: this.closeModal
      });
  }

  openModal = (initialTab) => this.props.onModalOpen(initialTab);

  closeModal = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
    this.props.onModalClose();
  }

  render() {
    if (!this.props.isVisible) return null;

    return (
      <Modal noBorder fullScreen={'md'} onClose={this.closeModal} style={{ borderRadius: 5 }}>
        <StyleRoot className="airstore-root-box" style={{ width: '100%', height: '100%' }}>
          {this.renderModalContent()}
        </StyleRoot>
      </Modal>
    );
  }

  renderModalContent() {
    const { activeTab, filteredTabs = [] } = this.props;

    return (
      <FocusLock>
        <div
          role="dialog"
          style={[{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            fontFamily: 'Roboto, sans-serif',
            background: '#181830'
          }]}
        >
          <div style={[CSS.tabs.header]}>
            <nav
              ref={node => this._nav = node} className="airstore-uploader-navigation"
              style={[CSS.tabs.header.container]}
            >
              {filteredTabs.map((tab, index) => (
                <a
                  href="javascript:void(0)"
                  role="menuitem"
                  id={`tab-${tab.id}`}
                  key={`tab-${tab.id}`}
                  className="tab-header-item selected"
                  style={[
                    CSS.tabs.header.container.item,
                    activeTab && activeTab.id === tab.id && CSS.tabs.header.container.item.selected
                  ]}
                  onClick={event => {
                    event.preventDefault();
                    this.props.onActivateTab(tab);
                  }}
                >
                  <i className={tab.iconClass} style={[CSS.tabs.header.container.item.i]}/>
                  <span title={tab.fullName} style={CSS.tabs.header.container.item.text}>{tab.shortName}</span>
                </a>
              ))}
            </nav>
          </div>
          <div style={[CSS.tabs.content, activeTab && activeTab.id === 'ICONS' && { overflow: 'hidden' }]}>
            {activeTab && <div style={[{ width: '100%' }]}>{activeTab.getContent.call(this)}</div>}
          </div>

        </div>
      </FocusLock>
    );
  }
}

export default connect(
  ({
     uploader: { backgrounds, isVisible, activeTab, uploaderConfig, activeModules, tabs, filteredTabs }
   }) => ({ backgrounds, isVisible, activeTab, uploaderConfig, activeModules, tabs, filteredTabs }),
  dispatch => ({
    onModalOpen: (tabName) => dispatch(modalOpen(tabName)),
    onModalClose: () => dispatch(modalClose()),
    onActivateTab: active => dispatch(activateTab(active)),
    onSetUploaderConfig: _config => dispatch(setUploaderConfig(_config)),
    onSetActiveModules: modules => dispatch(setActiveModules(modules)),
    onSetUploadHandler: handler => dispatch(setUploadHandler(handler)),
    onSetTabs: tabs => dispatch(setTabs(tabs))
  })
)(Radium(AirstoreUploader));