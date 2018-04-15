import React from 'react';
import { TagsWrapper, Tag, CloseIcon } from '../../styledComponents';


const IconTags = (props) => {
  const { active, searchPhrase, activeTags, toggleTag } = props;

  if (!(active && active.related_tags.length > 0)) return null;

  return (
    <TagsWrapper>
      {active.related_tags.filter(item => !item.tag.includes('sf-')).map(item => (
        <Tag
          hide={searchPhrase.includes(item.tag)}
          key={item.tag}
          active={activeTags[item.tag]}
          onClick={() => { toggleTag(item.tag) }}
        >
          {item.tag}
          <CloseIcon active={activeTags[item.tag]}/>
        </Tag>
      ))}
    </TagsWrapper>
  );
}

export default IconTags;