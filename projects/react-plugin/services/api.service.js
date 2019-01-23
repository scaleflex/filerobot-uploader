import axios from 'axios';


const independentProtocolRegex = /^[https|http]+\:\/\//g;
const getBaseUrl = (container) => `https://${container}.api.airstore.io/v1/`;

export const send = (url, method = 'GET', data = null, headers = {}, responseType = "json") =>
  axios({
    url: url,
    method: method,
    data: data,
    responseType: responseType,
    headers: headers,
    timeout: 30000
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
 * @returns {Promise}
 */
export const uploadFiles = (
  files = [], { uploadPath = '', uploadParams = {}, uploadKey = '' }, data_type = 'files[]', dir
) => {
  let url = (uploadPath || ''); // use independent protocol
  const ajaxData = new FormData();
  const jsonData = { files_urls: [] };
  const isJson = data_type === 'application/json';

  uploadParams = Object.assign({}, uploadParams, { dir: dir || uploadParams.dir });

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
      }
    ).then(
      response => {
        const { status = 'success', files = [], file } = response;

        if (status === 'success' && file) {
          //file.public_link = file.public_link.replace(independentProtocolRegex, '//');

          resolve([file]);
        }

        else if (status === 'success' && files) {
          resolve(files);
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

export const getListFiles = ({ dir = '', container = '' }) => {
  const baseUrl = getBaseUrl(container);
  const apiPath = 'list?';
  const directoryPath = dir ? 'dir=' + dir : '';
  const url = [baseUrl, apiPath, directoryPath].join('')

  return send(url).then((response = {}) => response.files);
};

export const searchFiles = ({ query = '', container = '' }) => {
  const baseUrl = getBaseUrl(container);
  const apiPath = 'search?';
  const url = [baseUrl, apiPath, `q=${query}`].join('');

  return send(url).then((response = {}) => response.files);
};

export const generateTags = (url, { key = '', provider = 'google', confidence = 60, limit = 10 }, language = 'en') => {
  const base = 'https://beta-process.scaleflex.cloud/'

  return send(
    `${base}?key=${key}&url=${url}&provider=${provider}&language=${language}&confidence=${confidence}&limit=${limit}`
  )
    .then((response = {}) => response);
}

export const saveMetaData = (id, properties, { container }) => {
  const base = `https://${container}.api.airstore.io/file/`;
  const data = { properties };

  return send(
    `${base}${id}/properties`,
    'PUT',
    data
  )
    .then((response = {}) => response);
}