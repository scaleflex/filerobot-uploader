import React, { Component } from 'react';
import Radium from 'radium';
import { IconsCss as styles } from '../assets/styles';
import { connect } from "react-redux";
import { uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons } from '../actions';
import { IconImage, HoverWrapper, ControlIcon } from '../styledComponents';
import LazyLoad from 'react-lazy-load';

const contentStyles = styles.container.content;
const iconStyles = contentStyles.results.icon;


class IconItem extends Component {
  hoverToggle(name, isHover) { this.setState({ [name]: isHover }) }

  onLoadImage = (target) => {
    target.style.opacity = 1;
    target.style.background = '#fff';
  };

  render() {
    const { icon, isUploading, uploadingIcon, onIconClick, upload } = this.props;
    const { isHover = false } = this.state;

    return (
      <div
        className="airstore-uploader-icon-item"
        style={[
          iconStyles,
          isUploading && uploadingIcon === icon.src && iconStyles.loading.active,
          isUploading && uploadingIcon !== icon.src && iconStyles.loading.notActive
        ]}
        // onClick={this.upload.bind(this, icon.src)}
        onClick={() => { onIconClick(icon.src); }}
        onKeyDown={event => { event.keyCode === 13 && upload(icon.src); }}
        onMouseOver={ this.hoverToggle.bind(this, 'isHover', true)}
        onMouseLeave={ this.hoverToggle.bind(this, 'isHover', false)}
        tabIndex={0}
      >
        <HoverWrapper isShow={isHover}>
          <ControlIcon className={'sfi-airstore-cross'}/>
          <ControlIcon className={'sfi-airstore-tick'}/>
          <ControlIcon className={'sfi-airstore-plus'}/>
        </HoverWrapper>

        <div style={[iconStyles.imageWrap]}>
          <LazyLoad height={60} offsetVertical={30} throttle={200} key={icon.uid}>
            <IconImage
              src={icon.src}
              width="100%"
              height="100%"
              alt={icon.desc}
              onLoad={({ target }) => this.onLoadImage(target)}
            />
          </LazyLoad>
        </div>
      </div>
    );
  }
}


export default connect(
  ({ uploader: { uploaderConfig }, icons: { categories, active } }) =>
    ({ uploaderConfig, categories, active }),
  dispatch => ({
    onGetCategories: () => dispatch(getIconsCategories()),
    onActivateCategory: (category, onSuccess) => dispatch(activateIconsCategory(category, onSuccess)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onShowMore: (categorySlug, searchParams, relevantActiveTags) => dispatch(fetchIcons(categorySlug, searchParams, relevantActiveTags))
  })
)(Radium(IconItem));