import axios from 'axios';
import config from '../config';

const independentProtocolRegex = /^[https|http]+\:\/\//g;

export const send = (url, method = 'GET', data = null, headers = { 'X-Airstore-Secret-Key': config.UPLOAD_KEY }, responseType = "json") =>
  axios({
    url: url,
    method: method,
    data: data,
    responseType: responseType,
    headers: headers,
    timeout: 30000
  }).then(
    ({ data = {} }) => data,
    ({ data = {} }) => data
  );


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
 * @param data_type     {string}  Available values: "files[]", "files_url[]" (or another if you use custom handler uploadPath)
 * @returns {Promise}
 */
export const uploadFiles = (files = [], { uploadPath = '', uploadParams = {} }, data_type = 'files[]') => {
  let url = (uploadPath || '').replace(independentProtocolRegex, '//'); // use independent protocol
  const ajaxData = new FormData();

  uploadParams = Object.assign({}, config.UPLOAD_PARAMS = {}, uploadParams);

  // generate params string
  const paramsStr = Object.keys(uploadParams)
    .filter(paramName => uploadParams[paramName] !== null) // do not use params with NULL value
    .map(paramName => `${paramName}=${uploadParams[paramName]}`)
    .join('&');

  if (paramsStr)
    url += `?${paramsStr}`

  if (files)
    [...files].forEach(file => ajaxData.append(data_type, file)); // fill FormData

  return new Promise((resolve, reject) => {
    send(url, 'POST', ajaxData).then(
      response => {
        const { status = 'success', files = [] } = response;

        if (status === 'success' && files && files.length)
          resolve(
            files.map(file => {
              file.public_link = file.public_link.replace(independentProtocolRegex, '//');

              return file;
            })
          );
        else
          reject(response);
      },

      error => {
        if (error.code === 'ECONNABORTED')
          console.warn('Network seems not good :(');

        reject(error);
      }
    );
  });
};
