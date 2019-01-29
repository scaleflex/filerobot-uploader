import React from 'react';
import { ImageEditor } from 'image-editor-reactjs/dist';

const IMAGE_EDITOR_CONFIG = {
  UPLOAD_KEY: '197779631d2d46c4b67ff9757720391d',
  AIRSTORE_UPLOAD_KEY: '197779631d2d46c4b67ff9757720391d',
  CONTAINER: 'jolipage002-global',
  UPLOAD_CONTAINER: 'jolipage002-global',
  PROCESS_WITH_CLOUDIMAGE: false,
  CLOUDIMAGE_TOKEN: 'scaleflex'
}


const ImageEditorWrapper = ({ src = '', }) => {

  return (
    <ImageEditor
      config={IMAGE_EDITOR_CONFIG}
      src={`https://${src}`}
      onUpload={(boom) => { console.log('boom', boom); }}
      onClose={() => {}}
    />
  );
}


export default ImageEditorWrapper;