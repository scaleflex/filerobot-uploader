import React, { Component, Fragment } from 'react';
import {
  FolderManagerWrapper, FolderToggleWrapper, FolderIcon, FolderTitle, ManagerHeader, ManagerHeaderTitle,
  CloseManagerBtn, Folder, Overlay
} from './folderManager.styled';
import FolderItem from './FolderItem';
import { I18n } from 'react-i18nify';


class FolderManager extends Component {
  constructor() {
    super();

    this.state = {
      showFileManager: false
    };
  }

  toggleSideMenu = () => {
    const showFileManager = !this.state.showFileManager;

    this.setState({ showFileManager });
  }

  render() {
    const { showFileManager } = this.state;
    const { folders = [], path } = this.props;

    return (
      <Fragment>
        <FolderToggleWrapper onClick={this.toggleSideMenu}>
          <FolderIcon/>
          <FolderTitle>
            {I18n.t('file_manager.change_folder')}
          </FolderTitle>
        </FolderToggleWrapper>

        <FolderManagerWrapper showFileManager={showFileManager}>
          <ManagerHeader>
            <ManagerHeaderTitle>
              {I18n.t('file_manager.media_library')}
            </ManagerHeaderTitle>
            <CloseManagerBtn onClick={this.toggleSideMenu}/>
          </ManagerHeader>

          {path &&
          <Folder onClick={this.props.goToLevelUpFolder}>
            <span className="btn-back"/>
            <Folder.Name title={I18n.t('file_manager.go_back')}>{'../'}</Folder.Name>
          </Folder>}

          {folders.map(folder => (
            <FolderItem
              key={folder.uuid}
              folder={folder}
              changeFolder={this.props.changeFolder}
            />
          ))}
        </FolderManagerWrapper>

        <Overlay show={showFileManager} onClick={this.toggleSideMenu}/>
      </Fragment>
    );
  }
}

export default FolderManager;