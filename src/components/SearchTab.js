import React, { Component } from 'react';
import Radium from 'radium';
import {uploadFilesFromUrls, searchImages} from '../actions';
import { connect } from 'react-redux';
import {isEnterClick} from '../utils';
import {CSS, SearchCss as styles} from '../assets/styles';

class SearchTab extends Component {
  state = { isLoading: false, uploadingUuid: null, isSearching: false };

  uploadStart = uuid => this.setState({ uploadingUuid: uuid, isLoading: true });

  uploadStop = () => this.setState({ uploadingUuid: null, isLoading: false });

  upload = (url) => {
    if (this.state.isLoading) return;

    this.uploadStart(url);
    this.props.onFileUpload(url, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  search = (q = '') => {
     if (!q) return;
     const done = () => this.setState({isSearching: false});

      this.setState({isSearching: true});
     this.props.onSearchImages(q).then(done, done);
  };

  componentDidMount() {}

  render() {
    const { isSearching } = this.state;
    const { query, images = [] } = this.props;

    return <div style={[styles.container, !images.length && styles.container.empty]}>
      {!images.length && <h3 style={[styles.container.title]}>You can search images here</h3>}

      <div style={[styles.container.searchBlock]}>
        <input
          style={[CSS.field]}
          type="search"
          ref="searchField"
          autoFocus={true}
          defaultValue={query || ''}
          onKeyDown={ev => isEnterClick(ev) && this.search(this.refs.searchField.value)}
        />

        <button style={[CSS.button]} onClick={() => this.search(this.refs.searchField.value)}>
          {isSearching ? 'Searching..' : 'Search'}
        </button>
      </div>
      {images && this.renderResults()}
    </div>
  }

  renderResults() {
    const { isLoading, uploadingUuid } = this.state;
    const { images = [] } = this.props;
    const resultStyles = styles.container.resultBlock;

    return <div style={[resultStyles]}>
      {images.map((image, index) =>
        <div
          style={[
            resultStyles.item,
            isLoading && uploadingUuid === image.original_url && resultStyles.item.loading.active,
            isLoading && uploadingUuid !== image.original_url && resultStyles.item.loading.notActive
          ]}
          key={`image-${index}`}
          onClick={this.upload.bind(this, image.original_url)}
        >
          <img src={image.thumb_url} width="100%" height="100%" />
        </div>
      )}
    </div>
  }
}

export default connect(
  ({uploader: {uploaderConfig}, search: {query, images}}) => ({uploaderConfig, query, images}),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([file], uploaderConfig)),
    onSearchImages: (q = '') => dispatch(searchImages(q))
  })
)(Radium(SearchTab));