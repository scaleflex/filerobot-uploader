import React from 'react';
import ImageEditor from 'filerobot-image-editor';
import { encodePermalink } from '../../utils';
import md5 from '../../utils/md5';


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

const onComplete = (prevTab, url, file, saveUploadedFiles, setPostUpload, options = {}, closeModal, uploadHandler) => {
  const files = [{ ...file, public_link: file.url_permalink }];

  uploadHandler(files, { stage: 'edit' });

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
  const { uploadKey, container, uploadParams, cloudimageToken, uploadHandler, language } = config;
  const isGif = file.url_permalink.slice(-3).toLowerCase() === 'gif';
  const imageEditorConfig = {
    isLowQualityPreview: true,
    colorScheme: 'dark',
    language,
    filerobot: {
      uploadKey,
      container,
      uploadParams: {
        ...uploadParams,
        dir: path || uploadParams.dir
      }
    },
    cloudimage: {
      token: cloudimageToken
    },
    processWithCloudimage: isGif,
    uploadWithCloudimageLink: true
  };
  //const src = `${encodePermalink(file.url_permalink)}?${md5(file.modified_at || '').slice(0, 6)}`;
  const src = file.url_permalink;

  return (
    <ImageEditor
      show={true}
      config={imageEditorConfig}
      closeOnLoad={false}
      src={src}
      onComplete={(url, file) => {
        onComplete(prevTab, url, file, saveUploadedFiles, setPostUpload, options, closeModal, uploadHandler);
      }}
      onClose={() => { goBack(prevTab, setPostUpload, options, closeModal); }}
      showGoBackBtn={true}
      showInModal={false}
    />
  );
}