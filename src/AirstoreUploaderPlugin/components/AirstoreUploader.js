import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { CSS } from '../assets/styles';
import { IconTab, BackgroundTab, UserUploaderTab, SearchTab } from './index';
import { Modal } from 'scaleflex-react-ui-kit/dist';
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
      id: 'SEARCH',
      fullName: 'Search',
      shortName: 'Search',
      iconClass: 'sfi-airstore-search',
      getContent: () => <SearchTab/>
    },
    {
      id: 'ICONS',
      fullName: 'Icons Library',
      shortName: 'Icons',
      iconClass: 'sfi-airstore-icon',
      getContent: () => <IconTab/>
    },
    {
      id: 'BACKGROUNDS',
      fullName: 'Backgrounds',
      shortName: 'Backgrounds',
      iconClass: 'sfi-airstore-bg',
      getContent: () => <BackgroundTab/>
    }
  ];

  componentDidMount() {
    const { initialOptions, initialTab } = this.props;

    this.props.onSetUploaderConfig(initialOptions || config || {});
    this.props.onSetActiveModules(initialOptions.MODULES ||config.MODULES || []);
    this.props.onSetUploadHandler(initialOptions.onUpload || null);
    this.props.onSetTabs(this.tabs);
    if (this.props.opened) this.openModal(initialTab);
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
      <Modal fullScreen={'lg'} onClose={this.closeModal}>
        <StyleRoot style={{ width: '100%', height: '100%'}}>{this.renderModalContent()}</StyleRoot>
      </Modal>
    );
  }

  renderModalContent() {
    const { activeTab, filteredTabs } = this.props;

    return (
      <div style={[
        { display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Roboto, sans-serif', background: '#181830' }
      ]}>
        <div style={[CSS.tabs.header]}>
          <div style={[CSS.tabs.header.container]}>
            {filteredTabs.map((tab, index) => (
              <a
                href="#"
                key={`tab-${index}`}
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
          </div>
        </div>

        <div style={[CSS.tabs.content, activeTab && activeTab.id === 'ICONS' && { overflow: 'hidden' }]}>
          {activeTab &&
          <div style={[{ width: '100%' }]}>{activeTab.getContent.call(this)}</div>
          }
        </div>
      </div>
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