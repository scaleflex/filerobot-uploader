import axios from 'axios';
import { uploadFormDataFiles } from '../utils/files-upload';
import { DUPLICATE_CODE, GALLERY_IMAGES_LIMIT, REPLACING_DATA_CODE } from '../config';


export const getBaseAPI = (baseAPI, container, platform) =>
  baseAPI ? baseAPI + '/' : getBaseUrl(container, platform);

export const getBaseUrl = (container, platform = 'filerobot') =>  platform === 'filerobot' ?
  `https://api.filerobot.com/${container}/v3/` :
  `https://${container}.api.airstore.io/v1/`;

export const getSecretHeaderName = (platform = 'filerobot') => platform === 'filerobot' ?
  `X-Filerobot-Key` : `X-Airstore-Secret-Key`;

export const send = (
  url,
  method = 'GET',
  data = null,
  headers = {},
  responseType = "json",
  restOptions = {}
) =>
  axios({
    url,
    method,
    data,
    responseType,
    headers,
    ...(restOptions || {})
  }).then(({ data = {} }) => data);


/**
 * Send files to airstore storage.
 * We can send 2 types of files:
 *  - files from <input type="file"/>
 *  - files from urls
 * Method understand what files we give via "data_type" attribute.
 *
 * @param props.uploadPath    {string}  Airstore upload url (like: "//jolipage001.api.airstore.io/upload") or custom
 *   handler
 * @param props.uploadParams  {object}  Params which we need to send to uploadPath
 * @param props.files         {array}   Array with files
 * @param props.uploadKey     {string}  = secret key
 * @param props.data_type     {string}  Available values: "files[]", "files_url[]" (or another if you use custom
 *   handler
 *   uploadPath)
 * @param props.dir     {string}  = directory to upload files
 * @param props.showAlert     {function}  = show alert
 * @returns {Promise}
 */
export const uploadFiles = (props) => {
  let {
    files = [],
    config: { platform, uploadPath = '', uploadParams = {}, uploadKey = '', onUploadProgress } = {},
    data_type = 'files[]',
    dir,
    showAlert
  } = props;
  let url = (uploadPath || ''); // use independent protocol
  const jsonData = { files_urls: [] };
  const isJson = data_type === 'application/json';
  const defaultHeaders = { [getSecretHeaderName(platform)]: uploadKey };

  uploadParams = { ...uploadParams, ...{ dir: dir || uploadParams.dir } };

  // generate params string
  const paramsStr = Object.keys(uploadParams)
    .filter(paramName => uploadParams[paramName] !== null) // do not use params with NULL value
    .map(paramName => `${paramName}=${uploadParams[paramName]}`)
    .join('&');

  if (paramsStr)
    url += `?${paramsStr}`

  function handleError(error) {
    const data = (error.response && error.response.data) || {};
    const msg = data.msg && (data.msg.join ? data.msg.join(', ') : data.msg);

    showAlert(msg || error.msg || error.message, data.hint || '', 'error', 8000);

    return error;
  }

  if (files && isJson) {
    [...files].forEach(file => { jsonData.files_urls.push(file); });

    return new Promise((resolve, reject) => {
      send(
        url,
        'POST',
        jsonData,
        { ...defaultHeaders, 'Content-Type': 'application/json' },
        'json',
        { onUploadProgress }
      )
        .then(
          response => {
            const { status = 'success', files = [], file, upload = {} } = response;
            const isDuplicate = upload.state === DUPLICATE_CODE;
            const isReplacingData = upload.state === REPLACING_DATA_CODE;

            if (status === 'success' && file) {
              resolve([[file], isDuplicate, isReplacingData]);
            } else if (status === 'success' && files) {
              resolve([files, isDuplicate, isReplacingData]);
            } else if (status === 'error') {
              throw new Error(response.msg + ' ' + response.hint);
            } else
              reject(response);
          }
        )
        .catch(error => {
          handleError(error);
          reject(error);
        });
    });
  }

  const ajaxData = new FormData();
  [...(files || [])].forEach(file => ajaxData.append(data_type, file, file.name || null));

  return uploadFormDataFiles(ajaxData, url, onUploadProgress, { headers: { ...defaultHeaders } })
    .then(responses => {
      let uploadedFiles = [];
      let isDuplicate = false;
      let isReplacingData = false;

      responses.forEach(response => {
        if (response) {
          if (response.file) {
            uploadedFiles.push(response.file);
          } else if (response.files) {
            uploadedFiles = [...uploadedFiles, ...response.files];
          }

          if (response.upload && response.upload.state) {
            if (response.upload.state === DUPLICATE_CODE) {
              isDuplicate = true;
            }
            if (response.upload.state === REPLACING_DATA_CODE) {
              isReplacingData = true;
            }
          }
        }
      });

      return [uploadedFiles, isDuplicate, isReplacingData];
    })
    .catch(handleError);
};

export const getListFiles = ({ dir = '', container = '', baseAPI, platform, offset, uploadKey }) => {
  const baseUrl = getBaseAPI(baseAPI, container, platform);
  const apiPath = 'list?';
  const directoryPath = dir ? 'dir=' + dir : '';
  const offsetQuery = `&offset=${offset}`;
  const limit = `&limit=${GALLERY_IMAGES_LIMIT}`;
  const url = [baseUrl, apiPath, directoryPath, offsetQuery, limit].join('');

  return send(url, 'GET', null, { [getSecretHeaderName(platform)]: uploadKey }).then((response = {}) => ([
    response.files,
    response.directories,
    response.current_directory && response.current_directory.files_count
  ]));
};

export const searchFiles = ({ query = '', container = '', platform, baseAPI, language = 'en', offset = 0, uploadKey }) => {
  const baseUrl = getBaseAPI(baseAPI, container, platform);
  const apiPath = 'search?';
  const searchQuery = `q=${query}`;
  const offsetQuery = `&offset=${offset}`;
  const url = [baseUrl, apiPath, searchQuery, offsetQuery].join('');

  return send(url, 'GET', null, { [getSecretHeaderName(platform)]: uploadKey })
    .then((response = {}) => ([response.files, response.info && response.info.total_files_count]));
};

export const generateTags = (url = '', autoTaggingProps = {}, language = 'en', container = '', baseAPI, platform, uploadKey = '', cloudimageToken = 'demo') => {
  const { provider = 'google', confidence = 60, limit = 10 } = autoTaggingProps;
  const baseUrl = getBaseAPI(baseAPI, container, platform);
  const base = `${baseUrl}process/autotag`;

  return send(
    `${base}`,
    'POST',
    {
      file: {
        url: url,
        uuid: ""
      },
      meta: {
        languages: [language],
        provider,
        limit,
        confidence
      }

    },
    {
      [getSecretHeaderName(platform)]: uploadKey
    }
  )
    .then((response = {}) => response);
}

export const saveMetaData = (id, properties, { container, baseAPI, platform, uploadKey }) => {
  const baseUrl = getBaseAPI(baseAPI, container, platform);
  const base = `${baseUrl}file/`;
  const data = { properties };

  return send(
    `${base}${id}/properties`,
    'PUT',
    data,
    {
      [getSecretHeaderName(platform)]: uploadKey
    }
  )
    .then((response = {}) => response);
}

export const updateProduct = (id, product, { container, baseAPI, platform, uploadKey }) => {
  const baseUrl = getBaseAPI(baseAPI, container, platform);
  const data = { product };

  return send(
    `${baseUrl}file/${id}/product`,
    'PUT',
    data,
    {
      [getSecretHeaderName(platform)]: uploadKey
    }
  )
    .then((response = {}) => response);
}

export const getTokenSettings = ({ container = '', baseAPI, platform, uploadKey }) => {
  const baseUrl = getBaseAPI(baseAPI, container, platform);

  return send(
    [baseUrl, 'settings'].join(''),
    'GET',
    null,
    { [getSecretHeaderName(platform)]: uploadKey }
  )
    .then(({ settings = {} } = {}) => ({
      productsEnabled: settings._products_enabled === 1
    }));
};