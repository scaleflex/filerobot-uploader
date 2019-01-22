import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from "react-redux";
import {
  SidebarWrap, SideBar, ColorWrapper, ColorItem, ColorItemName, Label, CountTag
} from '../../styledComponents/index';
import { I18n } from 'react-i18nify';

const tags = [
  { tag: 'sf-social', label: 'Social', count: '23' },
  { tag: 'arrows', label: 'Arrows', count: '5414' },
  { tag: 'audio', label: 'Audio & Video', count: '2716' },
  { tag: 'date', label: 'Date & Time', count: '1523' },
  { tag: 'currency', label: 'Currency', count: '3531' },
  { tag: 'business', label: 'Business', count: '8882' }
];


class IconSidebar extends Component {
  render() {
    const { toggleColorType, activeColorType } = this.props;

    return (
      <SidebarWrap>
        <SideBar id="airstore-uploader-tags-box">
          <Label fs={'16px'} color={'black'}>{I18n.t('icons.color_filter')}</Label>
          <ColorWrapper>
            <ColorItem
              key="all-color-wrapper"
              active={activeColorType === 'all'}
              onClick={() => { toggleColorType('all'); }}
              onKeyDown={event => { event.keyCode === 13 && toggleColorType('all'); }}
              tabIndex={0}
              role="button"
            >
              <ColorItemName>{I18n.t('icons.all')}</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'multi'}
              key="multi-color-wrapper"
              onClick={() => { toggleColorType('multi'); }}
              onKeyDown={event => { event.keyCode === 13 && toggleColorType('multi'); }}
              tabIndex={0}
              role="button"
            >
              <ColorItemName>{I18n.t('icons.multi_color')}</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'mono'}
              key="mono-color-wrapper"
              onClick={() => { toggleColorType('mono'); }}
              onKeyDown={event => { event.keyCode === 13 && toggleColorType('mono'); }}
              tabIndex={0}
              role="button"
            >
              <ColorItemName>{I18n.t('icons.mono_color')}</ColorItemName>
            </ColorItem>
          </ColorWrapper>

          <Label fs={'16px'} color={'black'}>{I18n.t('upload.categories')}</Label>
          {tags && tags
            .sort((a, b) => a.tag > b.tag ? 1 : -1)
            .map(tag => this.renderTag(tag))
          }
        </SideBar>
      </SidebarWrap>
    );
  }

  renderTag = ({ tag, label, count }) => {
    const { activePresetTag, onActivatePresetTag } = this.props;

    return (
      <ColorItem
        key={`category-${tag}`}
        active={tag === activePresetTag}
        onClick={() => { onActivatePresetTag(tag); }}
        onKeyDown={event => { event.keyCode === 13 && onActivatePresetTag(tag); }}
        tabIndex={0}
        role="button"
      >
        <ColorItemName>{label || tag.replace(/_/g, ' ').trim()}</ColorItemName>
        <CountTag>({count})</CountTag>
      </ColorItem>
    )
  }
}

export default connect(
  ({ icons: { tags, active } }) => ({ tags, active }),
  null
)(Radium(IconSidebar));