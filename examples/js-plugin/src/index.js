import '../../../projects/js-plugin/index';
import './style.css';
import prettyBytes from 'pretty-bytes';

let loadedImage = null;

// Configuration
let options = {
  modules: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'], // optional default: 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
  uploadParams: {                 // optional default: {}
    dir: '/dima_test_2'
  },
  // elementID: 'airstore-uploader', // optional default : 'airstore-uploader'
  folders: [                             // required if UPLOADED_IMAGES is set
    { dir: '/dima_test_2', label: 'All' },
    //{ dir: '/company_test/project_test', label: 'Project' }
  ],
  airstoreUploadKey: '0cbe9ccc4f164bf8be26bd801d53b132', // required
  openpixKey: 'xxxxxxxxxxxxxxx',                          // required if ICONS_GALLERY et IMAGES_GALLERY
  container: 'example',                           // required
  initialTab: 'UPLOAD',                          // optional   default first module
  tagging: {
    active: true,
    auto_tagging: true,
    provider: 'google', // google|imagga
    confidence: 60, //  [0..100]
    limit: 10,
    key: 'aaaa'
  },
  language: 'ru',
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
  }
};

window.addEventListener('load', function() {
  if (window.AirstoreUploader) {
    window.AirstoreUploader.init(options);
    const openBtn = document.getElementById('open-modal-btn');
    if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
  }
});