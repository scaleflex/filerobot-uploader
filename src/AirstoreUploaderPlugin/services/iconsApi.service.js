import axios from 'axios';

const api_endpoint = '//api.icons.rest/v1/';

const _send = (url, method = 'GET', data = null, headers = {}, responseType = "json") =>
  new Promise((resolve, reject) => {

    // check in cache
    //if (method.toLowerCase() === 'get') {
    //  const cacheResponse = sessionStorage.getItem(url);
    //
    //  if (cacheResponse) {
    //    resolve(JSON.parse(cacheResponse));
    //    return;
    //  }
    //}

    axios({
      url: url,
      method: method,
      data: data,
      responseType: responseType,
      headers: headers,
      timeout: 30000
    }).then(
      (response) => {
        const { data = {} } = response;
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


export const getCategories = () =>
  _send(`${api_endpoint}categories`)
    .then(
      ({ categories = [] }) => categories
    );

export const getCategoryIcons = (category_slug = '', page = 1, limit = 36) =>
  _send(`${api_endpoint}category/${category_slug}?limit=${limit}&page=${page}`)
    .then(
      ({ icons = [], count = 0 }) => ({ icons: icons || [], count })
    );

export const searchIcons = (page = 1, q = '', limit = 36) =>
  _send(`${api_endpoint}search?limit=${limit}&page=${page}&q=${q}`)
    .then(
      ({ icons = [], count = 0 }) => ({ icons: icons || [], count })
    );

