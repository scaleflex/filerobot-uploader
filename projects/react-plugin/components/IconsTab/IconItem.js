import React, { Component } from 'react';
import {
  IconTabImg, HoverWrapper, AddTagBtn, NotRelevantBtn, ActionsIconWrapper, IconBoxWrapperInner, IconWrapper
} from '../../styledComponents';


class IconItem extends Component {
  state = { isHover: false };
  hoverToggle(name, isHover) { this.setState({ [name]: isHover }) }

  render() {
    const { icon, onIconClick, addTag, isShowAddTagBtn, isShowNotRelevantBtn, setAsNotRelevant,
      onLoadImage, columnWidth, index
    } = this.props;
    const { isHover = false } = this.state;
    const resultWidth = Math.floor(columnWidth);

    return (
      <IconBoxWrapperInner
        onClick={() => { onIconClick(icon); }}
        onKeyDown={event => { event.keyCode === 13 && onIconClick(icon); }}
        role="button"
        onMouseOver={ this.hoverToggle.bind(this, 'isHover', true)}
        onMouseLeave={ this.hoverToggle.bind(this, 'isHover', false)}
        tabIndex={index}
      >
        <HoverWrapper isShow={isHover}>
          <ActionsIconWrapper>
            {isShowAddTagBtn &&
            <AddTagBtn tabIndex={-1} sm themeColor onClick={(event) => { addTag(event, icon); }}>+</AddTagBtn>}
            {isShowNotRelevantBtn &&
            <NotRelevantBtn tabIndex={-1} sm danger onClick={(event) => { setAsNotRelevant(event, icon); }}>x</NotRelevantBtn>}
          </ActionsIconWrapper>
        </HoverWrapper>

        <IconWrapper width={resultWidth} height={resultWidth}>
          <IconTabImg
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