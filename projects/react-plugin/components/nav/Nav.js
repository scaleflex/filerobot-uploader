import React from 'react';
import { CSS } from '../../assets/styles';
import { Tab } from './Nav.styled';
import { I18n } from 'react-i18nify';


export default ({ tabs, activeTabId, ...props }) => (
  <nav
    className="airstore-uploader-navigation"
    style={CSS.tabs.header.container}
  >
    {tabs.map((tab) => (
      <Tab
        selected={activeTabId === tab.id}
        href="javascript:void(0)"
        role="menuitem"
        id={`tab-${tab.id}`}
        key={`tab-${tab.id}`}
        className={`tab-header-item selected ${activeTabId === tab.id ? 'active' : ''}`}
        onClick={event => { props.activateTab(event, tab.id); }}
      >
        <i className={tab.iconClass}/>
        <span title={tab.fullName}>{I18n.t(tab.shortName)}</span>
      </Tab>
    ))}
  </nav>
);