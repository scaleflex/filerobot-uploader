import React, { Component } from 'react';
import Radium from 'radium';
import {CSS} from '../assets/styles';
import {
  Modal, IconTab, BackgroundTab, UserUploaderTab, SearchTab
} from './';
import {
  modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules, setUploadHandler, setTabs
} from '../actions'
import { connect } from 'react-redux';


class AirstoreUploader extends Component {
  tabs = [
    {id: 'USER_UPLOAD', fullName: 'Upload', shortName: 'Upload', icon: '\uf0ee', getContent: () => <UserUploaderTab/>},
    {id: 'SEARCH', fullName: 'Search', shortName: 'Search', icon: '\uf0ee', getContent: () => <SearchTab/>},
    {id: 'ICONS', fullName: 'Icons Library', shortName: 'Icons', icon: '\uf1a0', getContent: () => <IconTab/>},
    {id: 'BACKGROUNDS', fullName: 'Backgrounds', shortName: 'Backgrounds', icon: '\uf1a0', getContent: () => <BackgroundTab/>}
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
          <Modal onClose={this.closeModal} content={this.renderModalContent()} style={this.props.style}/>
        }
      </div>
    );
  }

  renderModalContent() {
    const { activeTab, filteredTabs } = this.props;

    return (
      <div style={[{ height: 550, display: 'flex', flexDirection: 'column' }]}>

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
                <i style={[CSS.fa, CSS.tabs.header.container.item.i]}>{tab.icon}</i>
                <span title={tab.fullName}>{tab.shortName}</span>
              </a>
            ))}
          </div>
        </div>

        <div style={[CSS.tabs.content, activeTab && activeTab.id === 'ICONS' && {overflow: 'hidden'}]}>
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