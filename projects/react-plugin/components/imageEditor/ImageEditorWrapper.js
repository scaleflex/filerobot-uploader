import React, { Component } from 'react';
import { ImageEditor } from 'image-editor-reactjs/dist';
import { connect } from 'react-redux'
import { modalClose } from '../../actions';


class ImageEditorWrapper extends Component {
  goBack = () => {
    const { prevTab } = this.props;

    if (prevTab === 'TAGGING')
      this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY');
    else
      this.props.setPostUpload(false);
  }

  onUpload = (url, file) => {
    const { prevTab } = this.props;

    if (prevTab === 'TAGGING') {
      const files = [{...file, public_link: file.url_permalink }];

      this.props.saveUploadedFiles(files);

      this.props.setPostUpload(true, 'TAGGING');
    }

    else
      this.props.setPostUpload(false);
  }

  render() {
    const { files: [ file = {} ] = {}, path } = this.props;
    const { uploadKey, container, uploadParams } = this.props.config

    return (
      <ImageEditor
        config={{
          UPLOAD_KEY: uploadKey,
          AIRSTORE_UPLOAD_KEY: uploadKey,
          CONTAINER: container,
          UPLOAD_CONTAINER: container,
          PROCESS_WITH_CLOUDIMAGE: false,
          HIDE_CLOUDIMAGE_PROCESS: true,
          UPLOAD_PARAMS: {
            ...uploadParams,
            dir: path || uploadParams.dir
          }
        }}
        closeOnLoad={false}
        src={file.url_permalink}
        onUpload={this.onUpload}
        onClose={this.goBack}
        showGoBackBtn={true}
      />
    )
  }
}


const mapStateToProps = state => ({
  uploadHandler: state.uploader.uploaderConfig.uploadHandler,
  editorConfig: state.uploader.uploaderConfig.imageEditor,
  language: state.uploader.uploaderConfig.language,
  config: state.uploader.uploaderConfig
})

export default connect(
  mapStateToProps,
  { modalClose }
)(ImageEditorWrapper);