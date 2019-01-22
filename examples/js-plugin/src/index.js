import '../../../projects/js-plugin/index';
import './style.css';
import prettyBytes from 'pretty-bytes';

let loadedImage = null;

// Configuration
let options = {
  MODULES: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'], // optional default: 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
  UPLOAD_PARAMS: {                 // optional default: {}
    dir: '/dima_test'
  },
  // ELEMENT_ID: 'airstore-uploader', // optional default : 'airstore-uploader'
  UPLOADED_FOLDERS: [                             // required if UPLOADED_IMAGES is set
    { dir: '/dima_test', label: 'All' },
    //{ dir: '/company_test/project_test', label: 'Project' }
  ],
  AIRSTORE_UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132', // required
  OPENPIX_KEY: 'xxxxxxxxxxxxxxx',                          // required if ICONS_GALLERY et IMAGES_GALLERY
  CONTAINER: 'example',                           // required
  INITIAL_TAB: 'UPLOAD',                          // optional   default first module
  TAGGING: {
    active: true,
    auto_tagging: true,
    provider: 'google', // google|imagga
    confidence: 60, //  [0..100]
    limit: 10,
    key: 'aaaa'
  },
  LANGUAGE: 'ru',
  onUpload: (files) => {
    const img = files[0];
    const image = document.getElementById('image-box');
    const editBtn = document.getElementById('edit-image-btn');
    const description = document.getElementById('image-description');
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const firstLoad = (img.created_at ? (new Date(img.created_at)) : new Date()).toLocaleTimeString("en-us", options);
    const lastModified = (img.modified_at ? (new Date(img.modified_at)) : new Date()).toLocaleTimeString("en-us", options);

    img.properties.tags = img.properties.tags || [];

    loadedImage = img;
    editBtn.removeAttribute('disabled');

    editBtn.onclick = function() {
      window.AirstoreUploader.open('TAGGING', { file: loadedImage });
    }

    image.src = img.url_public;
    description.innerHTML = `
    <ul>
        <li>
          <span>File name: </span>
          <span>${img.name}</span>
        </li>
        <li>
          <span>Public link: </span>
          <span>${img.url_public}</span>
        </li>
        <li>
          <span>Size: </span>
          <span>${prettyBytes(img.size || 0)}</span>
        </li>
        <li>
          <span>First Uploaded: </span>
          <span>${firstLoad || ''}</span>
        </li>
        <li>
          <span>Last Modified: </span>
          <span>${lastModified || ''}</span>
        </li>
        <li>
          <span>Description: </span>
          <span>${img.properties.description || ''}</span>
        </li>
        <li>
          <span>Tags: </span>
          <span>${img.properties.tags.map(tag => tag['en']).join(', ')}</span>
        </li>
      </ul>
    `;
    console.log(img)
  }
};

window.addEventListener('load', function() {
  if (window.AirstoreUploader) {
    window.AirstoreUploader.init(options);
    const openBtn = document.getElementById('open-modal-btn');
    if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
  }
});