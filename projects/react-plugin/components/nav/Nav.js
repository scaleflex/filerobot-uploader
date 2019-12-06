import React from 'react';
import { Tab } from './Nav.styled';
import { I18n } from 'react-i18nify';
import { Nav } from '../UploadImagesTab/UserUploaderTab.styled';


export default ({ tabs, activeTabId, ...props }) => (
  <Nav className="airstore-uploader-navigation">
    {tabs.map((tab) => (
      <Tab
        selected={activeTabId === tab.id}
        href="#"
        role="menuitem"
        id={`tab-${tab.id}`}
        key={`tab-${tab.id}`}
        className={`tab-header-item selected ${activeTabId === tab.id ? 'active' : ''}`}
        onClick={event => { event.preventDefault(); props.activateTab(event, tab.id); }}
      >
        <i className={tab.iconClass}/>
        <span title={tab.fullName}>{I18n.t(tab.shortName)}</span>
      </Tab>
    ))}
  </Nav>
);