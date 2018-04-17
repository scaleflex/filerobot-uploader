import React, { Component } from 'react';
import {
  Icon, HoverWrapper, AddTagBtn, NotRelevantBtn, ActionsIconWrapper, IconBoxWrapperInner, IconWrapper
} from '../../styledComponents';


class IconItem extends Component {
  state = { isHover: false };
  hoverToggle(name, isHover) { this.setState({ [name]: isHover }) }

  render() {
    const { icon, onIconClick, upload, addTag, isShowAddTagBtn, isShowNotRelevantBtn, setAsNotRelevant,
      onLoadImage, columnWidth
    } = this.props;
    const { isHover = false } = this.state;

    return (
      <IconBoxWrapperInner
        onClick={() => { onIconClick(icon); }}
        onKeyDown={event => { event.keyCode === 13 && upload(icon); }}
        onMouseOver={ this.hoverToggle.bind(this, 'isHover', true)}
        onMouseLeave={ this.hoverToggle.bind(this, 'isHover', false)}
        tabIndex={0}
      >
        <HoverWrapper isShow={isHover}>
          <ActionsIconWrapper>
            {isShowAddTagBtn &&
            <AddTagBtn sm themeColor onClick={(event) => { addTag(event, icon); }}>+</AddTagBtn>}
            {isShowNotRelevantBtn &&
            <NotRelevantBtn sm danger onClick={(event) => { setAsNotRelevant(event, icon); }}>x</NotRelevantBtn>}
          </ActionsIconWrapper>
        </HoverWrapper>

        <IconWrapper width={columnWidth} height={columnWidth}>
          <Icon
            isHover={isHover}
            src={icon.src}
            alt={icon.desc}
            onLoad={({ target }) => onLoadImage(target, icon)}
          />
        </IconWrapper>
      </IconBoxWrapperInner>
    );
  }
}


export default IconItem;