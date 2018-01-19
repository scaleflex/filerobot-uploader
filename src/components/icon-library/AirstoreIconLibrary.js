import React, { Component } from 'react';
import Radium from 'radium';
import styles from './styles.css';
import {connect} from "react-redux";
import {uploadFilesFromUrls, getIconsCategories, activateIconsCategory, fetchIcons} from '../../actions';

class AirstoreIconLibrary extends Component {
  state = { height: '128px', isLoading: false, isUploading: false, uploadingIcon: null };

  uploadStart = url => this.setState({ uploadingIcon: url, isUploading: true });
  uploadStop = () => this.setState({ uploadingIcon: null, isUploading: false });

  upload = (iconUrl = null) => {
    if (this.state.isUploading) return;

    this.uploadStart(iconUrl);
    this.props.onFileUpload(iconUrl, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  showMore = () => {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    setTimeout(() => {
      this.props.onShowMore(this.props.active.slug, (this.props.active.page || 0) + 1).then(
        () => this.setState({isLoading: false}),
        () => this.setState({isLoading: false})
      );
    });
  };

  componentDidMount() {
    this.props.onGetCategories();
  }

  render() {
    return (
      <div style={[{display: 'flex', height: '100%'}]}>
        {this.renderSidebar()}
        {this.renderContent()}
      </div>
    );
  }

  renderSidebar() {
    const { categories, active } = this.props;

    if (!active && categories.length) this.props.onActivateCategory(categories[0]);

    return (
      <div style={[{width: 160, borderRight: '1px solid rgb(221, 221, 221)', position: 'relative'}]}>
        <div style={[{overflow: 'auto', height: '100%', top: 0, position: 'absolute', width: '100%'}]}>
          {categories && categories.map(_c =>
            <div
              key={`category-${_c.slug}`}
              style={[
                {
                  padding: '10px 15px', fontSize: 12, color: 'rgb(85, 85, 85)', background: '#fff',
                  borderBottom: '1px solid rgb(221, 221, 221)', textTransform: 'capitalize', display: 'flex',
                  cursor: 'pointer'
                },
                active && _c.slug === active.slug && {background: 'rgb(51, 122, 183)', color: 'rgb(255, 255, 255)'}
              ]}
              onClick={() => this.props.onActivateCategory(_c)}
            >
              <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{_c.cat}</div>
              {'count' in _c && <div style={{flex: 1, marginLeft: 5, fontSize: 10}}>({_c.count})</div>}
            </div>
          )}
        </div>
      </div>
    );
  }

  renderContent() {
    const { active } = this.props;
    const { height, isUploading, uploadingIcon } = this.state;

    return (
      <div
        style={[{flex: 1, display: 'flex', flexWrap: 'wrap', overflow: 'auto'}]}
        onScroll={({target}) => {
          const { scrollTop, scrollHeight, clientHeight } = target;
          const scrolledToBottom = scrollHeight ===  scrollTop + clientHeight;
          if (scrolledToBottom) this.showMore();
        }}
      >
        {active && active.icons &&
        active.icons.map((icon, index) =>
          <div
            key={`icon-${icon.desc}-${index}`}
            style={[
              {width: '16.66%', height, margin: 0, padding: 2},
              isUploading && uploadingIcon === icon.src && {cursor: 'progress'},
              isUploading && uploadingIcon !== icon.src && {opacity: 0.1}
            ]}
            onClick={this.upload.bind(this, icon.src)}
          >
            <div style={{padding: 5, width: '100%', height: '100%', background: 'rgb(248, 248, 248)', cursor: 'pointer'}}>
              <img
                src={icon.src} width="100%" height="100%"
                onLoad={({target: {width}}) => {if (width && width !== height) this.setState({height: `${width}px`})}}
              />
            </div>
          </div>
        )
        }
        <div
          style={[
            {textAlign: 'center', padding: 20, width: '100%', textTransform: 'uppercase'},
            !this.state.isLoading && {visibility: 'hidden'}
          ]}
        >Loading..</div>
      </div>
    );
  }
}

export default connect(
  ({uploader: {uploaderConfig}, icons: {categories, active}}) =>
    ({uploaderConfig, categories, active}),
  dispatch => ({
    onGetCategories: () => dispatch(getIconsCategories()),
    onActivateCategory: category => dispatch(activateIconsCategory(category)),
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onShowMore: (categorySlug, page = 1, q = '') => dispatch(fetchIcons(categorySlug, page, q))
  })
)(Radium(AirstoreIconLibrary));