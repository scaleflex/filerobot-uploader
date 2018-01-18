import React, { Component } from 'react';
import Radium from 'radium';
import styles from '../styles.css';
import { AirstoreModal, UserUploadContent, IconsContent, BackgroundsContent } from './';
import {getBackgrounds, modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules} from '../actions'
import { uploadFiles } from '../services/api.service'
import { connect } from 'react-redux';


class AirstoreUploader extends Component {
  tabs = [
    {
      id: 'USER_UPLOAD', fullName: 'Upload from my computer', shortName: 'Upload', icon: '\uf0ee',
      getContent: () => <UserUploadContent uploadFiles={this.onUploadFiles.bind(this)}/>
    },
    {
      id: 'ICONS', fullName: 'Icons Library', shortName: 'Icons', icon: '\uf1a0',
      getContent: () => <IconsContent uploadFiles={this.onUploadFiles.bind(this)}/>
    },
    {
      id: 'BACKGROUNDS', fullName: 'Backgrounds Library', shortName: 'Backgrounds', icon: '\uf1a0',
      getContent: () => <BackgroundsContent uploadFiles={this.onUploadFiles.bind(this)}/>
    }
  ];

  openModal = () => this.props.onModalOpen();

  closeModal = () => this.props.onModalClose();

  onUploadFiles = (files, data_type = 'files[]') => {
    const { initialOptions, uploaderConfig } = this.props;
    const onUpload = initialOptions.on_upload;
    const { uploadPath, uploadParams } = uploaderConfig;

    return uploadFiles(uploadPath, uploadParams, files, data_type).then(
      files => {
        if (typeof onUpload === 'function') onUpload(files);
        else console.warn('onUpload() is not defined (AirstoreUploader)');

        this.closeModal();

        return false; // Correct to return "files" here, but we run closeModal() and our modal is removed that's why
                      // we return FALSE, and in promise.resolve handler we will do nothing in this case
        //return files;
      },

      error => error
    );
  };

  getFilteredTabs = () => this.tabs.filter(tab => tab.id && this.props.activeModules.indexOf(tab.id) !== -1);

  componentDidMount() {
    const { initialOptions, onActivateTab, onSetUploaderConfig, onSetActiveModules} = this.props;

    onSetUploaderConfig(initialOptions.settings || {});
    onSetActiveModules(initialOptions.modules || []);

    setTimeout(() => {
      const filteredTabs = this.getFilteredTabs();
      if (filteredTabs && filteredTabs.length) onActivateTab(filteredTabs[0]);

      if (this.props.activeModules.indexOf('BACKGROUNDS') !== -1) this.props.onGetBackgrounds();
    });
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
    const { activeTab } = this.props;

    return (
      <div style={[{ height: 550 }]}>

        <div style={[styles.tabs.header]}>
          <div style={[styles.tabs.header.container]}>
            {this.getFilteredTabs().map((tab, index) => (
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

        <div style={[styles.tabs.content]}>
          {activeTab && activeTab.getContent.call(this)}
        </div>
      </div>
    );
  }
}

export default connect(
  ({
     uploader: {backgrounds, isVisible, activeTab, uploaderConfig, activeModules}
  }) => ({backgrounds, isVisible, activeTab, uploaderConfig, activeModules}),
  dispatch => ({
    onGetBackgrounds: () => dispatch(getBackgrounds()),
    onModalOpen: () => dispatch(modalOpen()),
    onModalClose: () => dispatch(modalClose()),
    onActivateTab: (active) => dispatch(activateTab(active)),
    onSetUploaderConfig: (_config) => dispatch(setUploaderConfig(_config)),
    onSetActiveModules: (modules) => dispatch(setActiveModules(modules))
  })
)(Radium(AirstoreUploader));