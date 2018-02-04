import React, { Component } from 'react';
import Radium from 'radium';
import {CSS} from '../assets/styles';
import { IconTab, BackgroundTab, UserUploaderTab, SearchTab } from './index';
import { Modal } from 'scaleflex-react-modules/dist';
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
    const { initialOptions } = this.props;

    this.props.onSetUploaderConfig(initialOptions.settings || {});
    this.props.onSetActiveModules(initialOptions.modules || []);
    this.props.onSetUploadHandler(initialOptions.onUpload || null);
    this.props.onSetTabs(this.tabs);
  }

  render() {
    return (
      <div>
        {this.props.isVisible &&
        <Modal fullScreen={'lg'} onClose={this.closeModal}>
          {this.renderModalContent()}
        </Modal>
        }
      </div>
    );
  }

  renderModalContent() {
    const { activeTab, filteredTabs } = this.props;

    return (
      <div style={[{ display: 'flex', flexDirection: 'column', height: '100%' }]}>

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