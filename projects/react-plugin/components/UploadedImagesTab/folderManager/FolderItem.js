import React, { Component } from 'react';
import { Folder, FolderIcon } from './folderManager.styled';


export default class FolderItem extends Component {
  onClickFolder = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.changeFolder(this.props.folder.path);
  }

  render() {
    const { folder } = this.props;

    return (
      <Folder onClick={this.onClickFolder}>
        <FolderIcon small mr="7px"/>

        <Folder.Name title={folder.name}>{folder.name}</Folder.Name>
      </Folder>
    )
  }
}

