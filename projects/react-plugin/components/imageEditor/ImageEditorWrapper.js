import React from 'react';
import ImageEditor from 'filerobot-image-editor';
import { getPubliclink, getCDNlink, getPubliclink } from '../../utils/adjustAPI.utils';


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
  const files = [{ ...file, public_link: getPubliclink(file) }];

  uploadHandler(files, { stage: 'edit' });

  if (options.closeOnEdit) {
    closeModal();

    return;
  }

  if (prevTab === 'TAGGING') {
    const files = [{ ...file, public_link: getPubliclink(file) }];

    saveUploadedFiles(files);

    setPostUpload(true, 'TAGGING');
  }

  else
    setPostUpload(false);
}

export default ({ appState, files: [file = {}] = {}, path, saveUploadedFiles, setPostUpload, options, closeModal }) => {
  const { prevTab, config } = appState;
  const { uploadKey, baseAPI, container, uploadParams, cloudimageToken, uploadHandler, language, imageEditorConfig = {} } = config;
  const isGif = getPubliclink(file).slice(-3).toLowerCase() === 'gif';
  const src = getCDNlink(file);

  return (
    <ImageEditor
      show={true}
      config={{
        isLowQualityPreview: true,
        colorScheme: 'dark',
        language,
        processWithCloudimage: isGif,
        uploadWithCloudimageLink: true,

        ...imageEditorConfig,

        filerobot: {
          baseAPI,
          uploadKey,
          container,
          uploadParams: {
            ...uploadParams,
            dir: path || uploadParams.dir,
            ...(imageEditorConfig.filerobot && imageEditorConfig.filerobot.uploadParams)
          },
          ...imageEditorConfig.filerobot
        },

        cloudimage: {
          token: cloudimageToken,
          ...imageEditorConfig.cloudimage
        }
      }}
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