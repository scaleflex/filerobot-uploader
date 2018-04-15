import React, { Component } from 'react';
import Radium from 'radium';
import {uploadFilesFromUrls, searchImages} from '../actions';
import { connect } from 'react-redux';
import {isEnterClick} from '../utils/index';
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

  onKeyDown = (event, original_url) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.upload({ src: original_url });
    }
  }

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
          placeholder={'e.g. nature'}
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
    const { images = [], query } = this.props;
    const resultStyles = styles.container.resultBlock;

    return <div style={[resultStyles]}>
      {images.map((image, index) =>
        <div
          style={[
            resultStyles.item,
            isLoading && uploadingUuid === image.original_url && resultStyles.item.loading.active,
            isLoading && uploadingUuid !== image.original_url && resultStyles.item.loading.notActive
          ]}
          key={`image-${image.original_url}`}
          onKeyDown={event => this.onKeyDown(event, image.original_url)}
          onClick={this.upload.bind(this, image.original_url)}
          tabIndex={1}
        >
          <span style={[resultStyles.item.alignmentBlock]}/>
          <img
            style={resultStyles.item.img}
            src={image.thumb_url}
            alt={image.alt || `${query} ${index + 1}`}
            width="100%"
            height="auto"
          />
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