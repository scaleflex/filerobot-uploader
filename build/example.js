(function() {
  let onUploadHandler = function (files = []) { // handler on upload images
    const [file] = files;
    const result = document.querySelector('.result');
    const resultImg = document.querySelector('.result-img');

    if (result) result.innerHTML = JSON.stringify(file || {}, null, 2);
    if (resultImg) {
      resultImg.src = file && file.url_permalink ? file.url_permalink : '';
      resultImg.style.display = 'inline-block';
    }
  };

  let options = {
    MODULES: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'],   // optional default: 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
    UPLOAD_PARAMS: {                 // optional default: {}
      dir: '/company_test/project_test'
    },
    //ELEMENT_ID: 'airstore-uploader', // optional default : 'airstore-uploader'
    UPLOADED_FOLDERS: [
      { dir: '/company_test', label: 'Company' },
      { dir: '/company_test/project_test', label: 'Project' }
    ],
    AIRSTORE_UPLOAD_KEY: '197779631d2d46c4b67ff9757720391d', // required
    OPENPIX_KEY: 'a000000000000000000000000000000f',// required
    CONTAINER: 'jolipage002-global',                           // required
    LIMIT_IMAGES_PER_RESPONSE: 100,                 // optional   default 100
    INITIAL_TAB: 'UPLOAD',                 // optional   default first tab
    IS_SHOW_ADD_TAG_BTN: true,                      // optional   default false
    IS_SHOW_NOT_RELEVANT_BTN: true,                 // optional   default false
    onUpload: onUploadHandler,                      // required
  };

  window.onload = function() {
    if (window.AirstoreUploader) {
      window.AirstoreUploader.init(options);

      const openBtn = document.querySelector('.open-modal-btn');
      if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
    }
  }
})();