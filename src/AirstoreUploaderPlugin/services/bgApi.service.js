import { send } from './api.service';

const api_endpoint = '//xxx.airstore.api/';
const backgroundsAPI = '//jolipage-public-assets.api.airstore.io/v1/list?dir=/Backgrounds/v1';




export const getBackgrounds = () => send(`${backgroundsAPI}`).then(({ status, files = [] }) => ({ status, files }));
