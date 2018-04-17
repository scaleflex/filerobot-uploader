import axios from 'axios';


const api_endpoint = '//api.imagesearch.rest/v3/icons/';

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


export const getTags = () =>
  _send(`${api_endpoint}tags`)
    .then(
      ({ tags = [] }) => tags
    );

export const searchIcons = (searchParams, relevantActiveTags = []) => {
  const { typeQuery, offset } = searchParams;
  const splittedString = searchParams.value.trim().split(' ');
  const value = `&q[]=${splittedString.map(string => string.trim()).join('&q[]=')}`;
  const tags = relevantActiveTags.map(tag => `&q[]=${tag}`).join('');
  const limitQuery = `&limit=250`;
  const offsetQuery = `&offset=${offset}`;

  return (
    _send(`${api_endpoint}?${value}${tags}${typeQuery}${limitQuery}${offsetQuery}`)
      .then(
        ({ icons = [], count = 0, related_tags }) => ({ icons: icons || [], count, related_tags })
      )
  );
}

export const addTag = (uid, tagName) => {
  return _send(`${api_endpoint}retag?uid=${uid}&op=ADD&tag=${tagName}`);
}

export const setAsNotRelevant = (searchParams, relevantActiveTags = [], uid) => {
  const splittedString = searchParams.value.trim().split(' ');
  const value = `&q[]=${splittedString.map(string => string.trim()).join('&q[]=')}`;
  const tags = relevantActiveTags.map(tag => `&q[]=${tag}`).join('');

  return _send(`${api_endpoint}improve/relevancy?${value}${tags}&uid=${uid}`);
}

export const sendSelectionData = (searchParams, relevantActiveTags = [], uid, shownIcons) => {
  const splittedString = searchParams.value.trim().split(' ');
  const value = `q[]=${splittedString.map(string => string.trim()).join('&q[]=')}`;
  const tags = relevantActiveTags.map(tag => `&q[]=${tag}`).join('');
  const data = `${value}${tags}&chosen_uid=${uid}&shown_icons_uid[]=${shownIcons.map(icon => icon.uid).join('&shown_icons_uid[]=')}`;

  return _send(`${api_endpoint}improve/selection`, 'POST', data, {}, 'application/x-www-form-urlencoded');
}