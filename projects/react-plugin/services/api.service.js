import axios from 'axios';
import { DUPLICATE_CODE, REPLACING_DATA_CODE, GALLERY_IMAGES_LIMIT } from '../config';


const independentProtocolRegex = /^[https|http]+\:\/\//g;
const getBaseUrl = (container) => `https://${container}.api.airstore.io/v1/`;

export const send = (url, method = 'GET', data = null, headers = {}, responseType = "json", onUploadProgress) =>
  axios({
    url: url,
    method: method,
    data: data,
    responseType: responseType,
    headers: headers,
    timeout: 30000,
    onUploadProgress
  }).then(({ data = {} }) => data);


/**
 * Send files to airstore storage.
 * We can send 2 types of files:
 *  - files from <input type="file"/>
 *  - files from urls
 * Method understand what files we give via "data_type" attribute.
 *
 * @param uploadPath    {string}  Airstore upload url (like: "//jolipage001.api.airstore.io/upload") or custom handler
 * @param uploadParams  {object}  Params which we need to send to uploadPath
 * @param files         {array}   Array with files
 * @param uploadKey     {string}  = secret key
 * @param data_type     {string}  Available values: "files[]", "files_url[]" (or another if you use custom handler
 *   uploadPath)
 * @param dir     {string}  = directory to upload files
 * @param showAlert     {function}  = show alert
 * @returns {Promise}
 */
export const uploadFiles = (
  files = [], { uploadPath = '', uploadParams = {}, uploadKey = '', onUploadProgress }, data_type = 'files[]', dir
) => {
  let url = (uploadPath || ''); // use independent protocol
  const ajaxData = new FormData();
  const jsonData = { files_urls: [] };
  const isJson = data_type === 'application/json';

  uploadParams = { ...uploadParams, ...{ dir: dir || uploadParams.dir } };

  // generate params string
  const paramsStr = Object.keys(uploadParams)
    .filter(paramName => uploadParams[paramName] !== null) // do not use params with NULL value
    .map(paramName => `${paramName}=${uploadParams[paramName]}`)
    .join('&');

  if (paramsStr)
    url += `?${paramsStr}`

  if (files && isJson) {
    [...files].forEach(file => { jsonData.files_urls.push(file); });
  } else if (files)
    [...files].forEach(file => ajaxData.append(data_type, file)); // fill FormData

  return new Promise((resolve, reject) => {
    send(
      url,
      'POST',
      isJson ? jsonData : ajaxData,
      {
        'X-Airstore-Secret-Key': uploadKey,
        'Content-Type': isJson ? 'application/json' : 'multipart/form-data'
      },
      'json',
      onUploadProgress
    ).then(
      response => {
        const { status = 'success', files = [], file, upload = {} } = response;
        const isDuplicate = upload.state === DUPLICATE_CODE;
        const isReplacingData = upload.state === REPLACING_DATA_CODE;

        if (status === 'success' && file) {
          //file.public_link = file.public_link.replace(independentProtocolRegex, '//');

          resolve([[file], isDuplicate, isReplacingData]);
        }

        else if (status === 'success' && files) {
          resolve([files, isDuplicate, isReplacingData]);
        }

        else if (status === 'error') {
          throw new Error(response.msg + ' ' + response.hint);
        }

        else
          reject(response);
      }
    )
      .catch((error = {}) => {
        const data = (error.response && error.response.data) || {};
        const code = data.code || '';
        const msg = data.msg && (data.msg.join ? data.msg.join(', ') : data.msg);

        alert(((code || msg) ? `${code}: ${msg}` : '') || error.msg || error.message);
        reject(error);
      });
  });
};

export const getListFiles = ({ dir = '', container = '', offset }) => {
  const baseUrl = getBaseUrl(container);
  const apiPath = 'list?';
  const directoryPath = dir ? 'dir=' + dir : '';
  const offsetQuery = `&offset=${offset}`;
  const limit = `&limit=${GALLERY_IMAGES_LIMIT}`;
  const url = [baseUrl, apiPath, directoryPath, offsetQuery, limit].join('');

  return send(url).then((response = {}) => ([
    response.files,
    response.directories,
    response.current_directory && response.current_directory.files_count
  ]));
};

export const searchFiles = ({ query = '', container = '', language = 'en', offset = 0 }) => {
  const baseUrl = getBaseUrl(container);
  const apiPath = 'search?';
  const searchQuery = `q=${query}`;
  const offsetQuery = `&offset=${offset}`;
  const url = [baseUrl, apiPath, searchQuery, offsetQuery].join('');

  return send(url).then((response = {}) => ([response.files, response.info && response.info.total_files_count]));
};

export const generateTags = (url = '', autoTaggingProps = {}, language = 'en', container = '', filerobotUploadKey = '', cloudimageToken = 'demo') => {
  const { key = '', provider = 'google', confidence = 60, limit = 10 } = autoTaggingProps;
  const base = 'https://eu-ms-371.elastic-v2.airstore.scal3fl3x.com/post-process/autotagging'

  return send(
    `${base}?${[
      `key=${key}`,
      `image_url=${url}`,
      `provider=${provider}`,
      `language=${language}`,
      `confidence=${confidence}`,
      `limit=${limit}`,
      `ci=${cloudimageToken}`
    ].join('&')}`,
    'GET',
    null,
    {
      'X-Airstore-Domain': container + '.api.airstore.io',
      'X-Airstore-Secret-Key': filerobotUploadKey
    }
  )
    .then((response = {}) => response);
}

export const saveMetaData = (id, properties, { container, uploadKey }) => {
  const base = `https://${container}.api.airstore.io/file/`;
  const data = { properties };

  return send(
    `${base}${id}/properties`,
    'PUT',
    data,
    {
      'X-Airstore-Secret-Key': uploadKey
    }
  )
    .then((response = {}) => response);
}