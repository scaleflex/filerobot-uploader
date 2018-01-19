import React, { Component } from 'react';
import Radium from 'radium';
import styles from '../styles.css';
import { AirstoreModal, UserUploadContent, IconsContent, BackgroundsContent } from './';
import { AirstoreSearchLibrary } from './search';
import {
  modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules, setUploadHandler, setTabs
} from '../actions'
import { uploadFiles } from '../services/api.service'
import { connect } from 'react-redux';


class AirstoreUploader extends Component {
  tabs = [
    {
      id: 'USER_UPLOAD', fullName: 'Upload from my computer', shortName: 'Upload', icon: '\uf0ee',
      getContent: () => <UserUploadContent/>
    },
    {
      id: 'SEARCH', fullName: 'Search', shortName: 'Search', icon: '\uf0ee',
      getContent: () => <div style={[{ width: '100%' }]}><AirstoreSearchLibrary/></div>
    },
    {
      id: 'ICONS', fullName: 'Icons Library', shortName: 'Icons', icon: '\uf1a0',
      getContent: () => <IconsContent/>
    },
    {
      id: 'BACKGROUNDS', fullName: 'Backgrounds Library', shortName: 'Backgrounds', icon: '\uf1a0',
      getContent: () => <BackgroundsContent/>
    }
  ];

  openModal = () => this.props.onModalOpen();

  closeModal = () => this.props.onModalClose();

  componentDidMount() {
    const { initialOptions, onSetUploaderConfig, onSetActiveModules, onSetUploadHandler, onSetTabs} = this.props;

    onSetUploaderConfig(initialOptions.settings || {});
    onSetActiveModules(initialOptions.modules || []);
    onSetUploadHandler(initialOptions.onUpload || null);
    onSetTabs(this.tabs);
  }

  render() {
    return (
      <div>
        {this.props.isVisible &&
          <AirstoreModal onClose={this.closeModal} content={this.renderModalContent()} style={this.props.style}/>
        }
      </div>
    );
  }

  renderModalContent() {
    const { activeTab, filteredTabs } = this.props;

    return (
      <div style={[{ height: 550 }]}>

        <div style={[styles.tabs.header]}>
          <div style={[styles.tabs.header.container]}>
            {filteredTabs.map((tab, index) => (
              <a
                href="#"
                key={`tab-${index}`}
                className="tab-header-item selected"
                style={[
                  styles.tabs.header.container.item,
                  activeTab && activeTab.id === tab.id && styles.tabs.header.container.item.selected
                ]}
                onClick={event => {
                  event.preventDefault();
                  this.props.onActivateTab(tab);
                }}
              >
                <j-i style={[styles.fa, styles.tabs.header.container.item.i]}>{tab.icon}</j-i>
                <j-span title={tab.fullName}>{tab.shortName}</j-span>
              </a>
            ))}
          </div>
        </div>

        <div style={[styles.tabs.content, activeTab && activeTab.id === 'ICONS' && {overflow: 'hidden'}]}>
          {activeTab && activeTab.getContent.call(this)}
        </div>
      </div>
    );
  }
}

export default connect(
  ({
     uploader: {backgrounds, isVisible, activeTab, uploaderConfig, activeModules, tabs, filteredTabs}
  }) => ({backgrounds, isVisible, activeTab, uploaderConfig, activeModules, tabs, filteredTabs}),
  dispatch => ({
    onModalOpen: () => dispatch(modalOpen()),
    onModalClose: () => dispatch(modalClose()),
    onActivateTab: active => dispatch(activateTab(active)),
    onSetUploaderConfig: _config => dispatch(setUploaderConfig(_config)),
    onSetActiveModules: modules => dispatch(setActiveModules(modules)),
    onSetUploadHandler: handler => dispatch(setUploadHandler(handler)),
    onSetTabs: tabs => dispatch(setTabs(tabs))
  })
)(Radium(AirstoreUploader));