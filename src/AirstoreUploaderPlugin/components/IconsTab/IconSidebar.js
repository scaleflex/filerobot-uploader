import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from "react-redux";
import {
  SidebarWrap, SideBar, ColorWrapper, ColorItem, ColorItemName, Label
} from '../../styledComponents/index';

const tags = [
  { tag: 'sf-social', label: 'Social' },
  { tag: 'arrows', label: 'Arrows' },
  { tag: 'audio', label: 'Audio & Video' },
  { tag: 'date', label: 'Date & Time' },
  { tag: 'currency', label: 'Currency' },
  { tag: 'business', label: 'Business' }
];


class IconSidebar extends Component {
  render() {
    const { toggleColorType, activeColorType } = this.props;

    return (
      <SidebarWrap>
        <SideBar id="airstore-uploader-tags-box">
          <Label fs={'16px'} color={'black'}>Color filter</Label>
          <ColorWrapper>
            <ColorItem
              key="all-color-wrapper"
              active={activeColorType === 'all'}
              onClick={() => { toggleColorType('all'); }}
            >
              <ColorItemName>All</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'multi'}
              key="multi-color-wrapper"
              onClick={() => { toggleColorType('multi'); }}
            >
              <ColorItemName>Multi color</ColorItemName>
            </ColorItem>

            <ColorItem
              active={activeColorType === 'mono'}
              key="mono-color-wrapper"
              onClick={() => { toggleColorType('mono'); }}
            >
              <ColorItemName>Mono color</ColorItemName>
            </ColorItem>
          </ColorWrapper>

          <Label fs={'16px'} color={'black'}>Categories</Label>
          {tags && tags
            //.sort((a, b) => a.cat > b.cat ? 1 : -1)
            .map(tag => this.renderTag(tag))
          }
        </SideBar>
      </SidebarWrap>
    );
  }

  renderTag = ({ tag, label }) => {
    const { activePresetTag, onActivatePresetTag } = this.props;

    return (
      <ColorItem
        key={`category-${tag}`}
        active={tag === activePresetTag}
        onClick={() => { onActivatePresetTag(tag); }}
      >
        <ColorItemName>{label || tag.replace(/_/g, ' ').trim()}</ColorItemName>
      </ColorItem>
    )
  }
}

export default connect(
  ({ icons: { tags, active } }) => ({ tags, active }),
  null
)(Radium(IconSidebar));