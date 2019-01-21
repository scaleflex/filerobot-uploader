import '../../../projects/js-plugin/index';

// Configuration
let options = {
  MODULES: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'], // optional default: 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
  UPLOAD_PARAMS: {                 // optional default: {}
    dir: '/your/directory'
  },
  // ELEMENT_ID: 'airstore-uploader', // optional default : 'airstore-uploader'
  UPLOADED_FOLDERS: [                             // required if UPLOADED_IMAGES is set
    { dir: '/company_test', label: 'Company' },
    { dir: '/company_test/project_test', label: 'Project' }
  ],
  AIRSTORE_UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132', // required
  OPENPIX_KEY: 'xxxxxxxxxxxxxxx',                          // required if ICONS_GALLERY et IMAGES_GALLERY
  CONTAINER: 'example',                           // required
  INITIAL_TAB: 'UPLOAD',                          // optional   default first module
  TAGGING: {
    active: true,
    provider: 'google', // google|imagga
    confidence: 80 //  [0..100]
  },
  onUpload: (img) => { console.log(img) },                      // required
};

window.addEventListener('load', function() {
  if (window.AirstoreUploader) {
    window.AirstoreUploader.init(options);
    const openBtn = document.getElementById('open-modal-btn');
    if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
  }
});