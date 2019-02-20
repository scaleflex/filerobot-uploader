import React from 'react';
import { ImageEditor } from 'image-editor-reactjs/dist';


const goBack = (prevTab, setPostUpload) => {
  if (prevTab === 'TAGGING')
    setPostUpload(true, 'TAGGING', 'MY_GALLERY');
  else
    setPostUpload(false);
};

const onUpload = (prevTab, url, file, saveUploadedFiles, setPostUpload) => {
  if (prevTab === 'TAGGING') {
    const files = [{...file, public_link: file.url_permalink }];

    saveUploadedFiles(files);

    setPostUpload(true, 'TAGGING');
  }

  else
    setPostUpload(false);
}

export default ({ appState, files: [ file = {} ] = {}, path, saveUploadedFiles, setPostUpload }) => {
  const { prevTab, config } = appState;
  const { uploadKey, container, uploadParams } = config;
  const isGif = file.url_permalink.slice(-3).toLowerCase() === 'gif';
  const imageEditorConfig = {
    UPLOAD_KEY: uploadKey,
    AIRSTORE_UPLOAD_KEY: uploadKey,
    CONTAINER: container,
    UPLOAD_CONTAINER: container,
    PROCESS_WITH_CLOUDIMAGE: isGif,
    HIDE_CLOUDIMAGE_PROCESS: true,
    UPLOAD_CLOUDIMAGE_IMAGE: true,
    CLOUDIMAGE_TOKEN: 'demo',
    UPLOAD_PARAMS: {
      ...uploadParams,
      dir: path || uploadParams.dir
    }
  };

  return (
    <ImageEditor
      config={imageEditorConfig}
      closeOnLoad={false}
      src={file.url_permalink}
      onUpload={(url, file) => { onUpload(prevTab, url, file, saveUploadedFiles, setPostUpload); }}
      onClose={() => { goBack(prevTab, setPostUpload); }}
      showGoBackBtn={true}
    />
  );
}