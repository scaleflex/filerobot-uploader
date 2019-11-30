import CONFIG from '../config';
import { isDefined } from './helper.utils';
import MobileDetect from 'mobile-detect';


const prepareConfig = (config = {}, onUpload = () => {}) => {
  const container = config.container || config.CONTAINER || CONFIG.container || '';

  config.tagging = config.tagging || config.TAGGING || CONFIG.tagging || {};
  config.modules = config.modules || [];

  // supporting old config
  const uploadKey = config.filerobotUploadKey || config.airstoreUploadKey || config.AIRSTORE_UPLOAD_KEY;
  const md = new MobileDetect(window.navigator.userAgent);

  return {
    mobile: md.mobile(),
    container,
    uploadPath: `https://${container}.api.airstore.io/v1/upload`,
    uploadParams: config.uploadParams || config.UPLOAD_PARAMS || CONFIG.uploadParams,
    uploadKey: uploadKey || CONFIG.airstoreUploadKey,
    openpixKey: config.openpixKey || config.OPENPIX_KEY || CONFIG.openpixKey,
    isShowAddTagBtn: isDefined(config.isShowAddTagBtn) ? config.isShowAddTagBtn : CONFIG.isShowAddTagBtn,
    isShowNotRelevantBtn:  isDefined(config.isShowNotRelevantBtn) ? config.isShowNotRelevantBtn : CONFIG.isShowNotRelevantBtn,
    limit: config.limitImagesPerResponse || config.LIMIT_IMAGES_PER_RESPONSE || CONFIG.limitImagesPerResponse || 100,
    folderBrowser: isDefined(config.folderBrowser) ? config.folderBrowser : CONFIG.folderBrowser,
    preUploadImageProcess: isDefined(config.preUploadImageProcess) ? config.preUploadImageProcess : false,
    processBeforeUpload: isDefined(config.preUploadImageProcess) ? config.processBeforeUpload : null,
    language: isDefined(config.language) ? config.language : CONFIG.language,
    cloudimageToken: config.cloudimageToken || CONFIG.cloudimageToken,
    searchPhrase: config.searchPhrase,
    imageEditor: {
      active: config.modules.includes('IMAGE_EDITOR'),
      ...config.imageEditor
    },
    tagging: {
      active: config.modules.includes('TAGGING'),
      ...config.tagging
    },
    autoCropSuggestions: config.autoCropSuggestions || false,

    uploadHandler: onUpload,

    imageEditorConfig: config.imageEditorConfig || {}
  };
};

export {
  prepareConfig
}