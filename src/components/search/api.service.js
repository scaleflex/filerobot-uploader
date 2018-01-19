import axios from 'axios';

const api_endpoint = 'https://api.imagesearch.rest/v1/';

const _send = (url, method = 'GET', data = null, headers = {}, responseType = "json") =>
  new Promise((resolve, reject) => {

    // check in cache
    if (method.toLowerCase() === 'get') {
      const cacheResponse = sessionStorage.getItem(url);

      if (cacheResponse) {
        resolve(JSON.parse(cacheResponse));
        return;
      }
    }

    axios({
      url: url,
      method: method,
      data: data,
      responseType: responseType,
      headers: headers,
      timeout: 30000
    }).then(
      ({ data = {} }) => {
        const { status = 'error' } = data;

        if (status === 'success') {
          resolve(data);

          // store in cache
          if (method.toLowerCase() === 'get')
            sessionStorage.setItem(url, JSON.stringify(data));
        }
        else
          reject(response);
      },
      ({ data = {} }) => { reject(data) }
    );
  });


export const search = (q = '') =>
  _send(`${api_endpoint}search?q=${q}`);
    // .then(
    //   (response) => response
    // );
