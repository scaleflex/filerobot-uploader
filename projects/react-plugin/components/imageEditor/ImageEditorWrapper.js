import React from 'react';
import ImageEditor from 'filerobot-image-editor';


const goBack = (prevTab, setPostUpload, options = {}, closeModal) => {
  if (options.closeOnEdit) {
    closeModal();

    return;
  }

  if (prevTab === 'TAGGING')
    setPostUpload(true, 'TAGGING', 'MY_GALLERY');
  else
    setPostUpload(false);
};

const onComplete = (prevTab, url, file, saveUploadedFiles, setPostUpload, options = {}, closeModal) => {
  if (options.closeOnEdit) {
    closeModal();

    return;
  }

  if (prevTab === 'TAGGING') {
    const files = [{ ...file, public_link: file.url_permalink }];

    saveUploadedFiles(files);

    setPostUpload(true, 'TAGGING');
  }

  else
    setPostUpload(false);
}

export default ({ appState, files: [file = {}] = {}, path, saveUploadedFiles, setPostUpload, options, closeModal }) => {
  const { prevTab, config } = appState;
  const { uploadKey, container, uploadParams } = config;
  const isGif = file.url_permalink.slice(-3).toLowerCase() === 'gif';
  const imageEditorConfig = {
    filerobotUploadKey: uploadKey,
    filerobotContainer: container,
    processWithCloudimage: isGif,
    uploadWithCloudimageLink: true,
    cloudimageToken: 'demo',
    uploadParams: {
      ...uploadParams,
      dir: path || uploadParams.dir
    }
  };

  return (
    <ImageEditor
      show={true}
      config={imageEditorConfig}
      closeOnLoad={false}
      src={file.url_permalink}
      onComplete={(url, file) => {
        onComplete(prevTab, url, file, saveUploadedFiles, setPostUpload, options, closeModal);
      }}
      onClose={() => { goBack(prevTab, setPostUpload, options, closeModal); }}
      showGoBackBtn={true}
      showInModal={false}
    />
  );
}