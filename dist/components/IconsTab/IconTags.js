import React from 'react';
import { TagsWrapper, Tag, CloseIcon } from '../../styledComponents';

var IconTags = function IconTags(props) {
  var tagsList = props.tagsList,
      searchPhrase = props.searchPhrase,
      activeTags = props.activeTags,
      toggleTag = props.toggleTag;


  if (!(tagsList.length > 0)) return null;

  return React.createElement(
    TagsWrapper,
    null,
    tagsList.filter(function (item) {
      return item.tag && !item.tag.includes('sf-');
    }).map(function (item) {
      return React.createElement(
        Tag,
        {
          hide: searchPhrase.includes(item.tag),
          key: item.tag,
          active: activeTags[item.tag],
          onClick: function onClick() {
            toggleTag(item.tag);
          }
        },
        item.tag,
        React.createElement(CloseIcon, { active: activeTags[item.tag] })
      );
    })
  );
};

export default IconTags;