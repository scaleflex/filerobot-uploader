import axios from 'axios';

const api_endpoint = '//api.imagesearch.rest/v3/icons/';

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

export const getCategoryIcons = (category_slug = '') =>
  _send(`${api_endpoint}category/${category_slug}`)
    .then(
      ({ icons = [], count = 0 }) => ({ icons: icons || [], count })
    );

export const searchIcons = (q = '', relevantActiveTags = []) =>
  _send(`${api_endpoint}?&q[]=${q}${relevantActiveTags.map(tag => `&q[]=${tag}`).join('')}`)
    .then(
      ({ icons = [], count = 0, related_tags }) => ({ icons: icons || [], count, related_tags })
    );

