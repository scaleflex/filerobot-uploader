import axios from 'axios';
import bgResponse from '../mocks/backgrounds.mock';

const api_endpoint = '//xxx.airstore.api/';

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
  })


export const getBackgrounds = () => new Promise(resolve => resolve(bgResponse));
  // _send(`${api_endpoint}list?dir=backgrounds`)
  //   .then(
  //     ({ categories = [] }) => categories
  //   );
