import React from 'react';
import { I18n } from 'react-i18nify';
import { Spinner } from '../Spinner';
import {
  SidebarWrap, ColorItem, ColorItemName, SideBar, AddColorBtn, Label, ColorFilterItem, CountTag
} from '../../styledComponents';


export default (props) => {
  const {
    activePresetTag, activeColorFilters, tags, backgrounds, onChangeColorFilter, onRemoveColorFilter, addColorFilter,
    onActivatePresetTag
  } = props;

  return (
    <SidebarWrap>
      <SideBar>
        <Label fs={'16px'} color={'black'}>{I18n.t('images.color_filter')}</Label>

        <div style={{ margin: '0 10px' }}>
          {activeColorFilters.map((colorFilter, index) => (
            <ColorFilterItem
              index={index}
              key={`colorFilter-${index}`}
              color={colorFilter.value}
              onChangeColorFilter={onChangeColorFilter}
              onRemoveColorFilter={onRemoveColorFilter}
            />
          ))}
        </div>

        <div style={{ padding: '5px 10px 12px' }}>
          <AddColorBtn
            onClick={addColorFilter}
            onKeyDown={event => { event.keyCode === 13 && addColorFilter(); }}
            tabIndex={0}
            role="button"
          >+ {I18n.t('images.add_color')}</AddColorBtn>
        </div>

        <Label fs={'16px'} color={'black'}>{I18n.t('upload.categories')}</Label>

        {tags.length &&
        <ColorItem
          key={`category-background`}
          active={'backgrounds' === activePresetTag}
          onClick={() => { onActivatePresetTag('backgrounds', 25); }}
          tabIndex={0}
          role="button"
        >
          <ColorItemName>{I18n.t('images.backgrounds')} </ColorItemName>
          <CountTag>(25+)</CountTag>
        </ColorItem>}
        {tags.slice(0, 20).map(({ tag, label, count } = {}) => (
          <ColorItem
            key={`category-${tag}`}
            active={tag === activePresetTag}
            onClick={() => { onActivatePresetTag(tag, count); }}
            onKeyDown={event => { event.keyCode === 13 && onActivatePresetTag(tag); }}
            tabIndex={0}
            role="button"
          >
            <ColorItemName title={label || tag.replace(/_/g, ' ').trim()}>
              {label || tag.replace(/_/g, ' ').trim()}
            </ColorItemName>
            <CountTag>
              ({count})
            </CountTag>
          </ColorItem>
        ))}
        {!tags.length ? <Spinner black show={true} style={{ fontSize: 8, top: 10, opacity: 0.4 }}/> : null}
      </SideBar>
    </SidebarWrap>
  )
}