import axios from 'axios';
import { send } from './api.service';
const api_endpoint = 'https://www.openpix.net/v3/';
const backgroundsAPI = '//jolipage-public-assets.api.airstore.io/v1/list?dir=/Backgrounds/v1';

const _send = (url, method = 'GET', data = null, headers = {}, responseType = "json") =>
  new Promise((resolve, reject) => {

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


export const getBackgrounds = () => send(`${backgroundsAPI}`).then(({ status, files = [] }) => ({ status, files }));

export const searchImages = (searchParams, relevantActiveTags = []) => {
  const { colorFiltersQuery, limit, offset, openpixKey } = searchParams;
  const splittedString = searchParams.value.trim().split(' ');
  const value = searchParams.value ? `&q[]=${splittedString.map(string => string.trim()).join('&q[]=')}` : '';
  const tags = relevantActiveTags.map(tag => `&q[]=${tag}`).join('');
  const limitQuery = `&limit=${limit}`;
  const offsetQuery = `&offset=${offset}`;
  const key = `&key=${openpixKey}`;

  return (
    _send(`${api_endpoint}search?${value}${tags}${colorFiltersQuery}${limitQuery}${offsetQuery}${key}`)
      .then(
        ({ related_tags = [], related_top_colors = [], images = [], count = 0 }) =>
          ({ images: images, count, related_tags, related_top_colors })
      )
  );
}

export const getImagesTags = () => _send(`${api_endpoint}pictures/tags`).then(({ tags }) => tags);