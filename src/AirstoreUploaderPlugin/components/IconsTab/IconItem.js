import React, { Component } from 'react';
import Radium from 'radium';
import { IconsCss as styles } from '../../assets/styles/index';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsTags, activateIconsCategory, fetchIcons } from '../../actions/index';
import {
  IconImage, HoverWrapper, AddTagBtn, NotRelevantBtn, ActionsIconWrapper
} from '../../styledComponents/index';
import LazyLoad from 'react-lazy-load';

const contentStyles = styles.container.content;
const iconStyles = contentStyles.results.icon;


class IconItem extends Component {
  hoverToggle(name, isHover) { this.setState({ [name]: isHover }) }

  render() {
    const {
      icon, isUploading, uploadingIcon, onIconClick, upload, iconSize, addTag, isShowAddTagBtn, isShowNotRelevantBtn,
      setAsNotRelevant, onLoadImage
    } = this.props;
    const { isHover = false } = this.state;

    return (
      <div
        className="airstore-uploader-icon-item"
        style={[
          iconStyles,
          isUploading && uploadingIcon === icon.src && iconStyles.loading.active,
          isUploading && uploadingIcon !== icon.src && iconStyles.loading.notActive,
          { padding: (Math.floor((iconSize - 64) / 2)) || 0}
        ]}
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

        <div style={[iconStyles.imageWrap, { width: 60, height: 60 }]}>
          <LazyLoad height={60} offsetVertical={30} throttle={0} key={icon.uid}>
            <IconImage
              isHover={isHover}
              src={icon.src}
              width="100%"
              height="100%"
              alt={icon.desc}
              onLoad={({ target }) => onLoadImage(target, icon)}
            />
          </LazyLoad>
        </div>
      </div>
    );
  }
}


export default connect(
  ({ uploader: { uploaderConfig }, icons: { tags, active } }) =>
    ({ uploaderConfig, tags, active }),
  dispatch => ({
    onGetTags: () => dispatch(getIconsTags()),
    onActivateCategory: (category, onSuccess) => dispatch(activateIconsCategory(category, onSuccess)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onShowMore: (categorySlug, searchParams, relevantActiveTags) => dispatch(fetchIcons(categorySlug, searchParams, relevantActiveTags))
  })
)(Radium(IconItem));