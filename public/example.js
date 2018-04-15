(function() {
  let onUploadHandler = function (files = []) { // handler on upload images
    const [file] = files;
    const result = document.querySelector('.result');
    const resultImg = document.querySelector('.result-img');

    if (result) result.innerHTML = JSON.stringify(file || {}, null, 2);
    if (resultImg) {
      resultImg.src = file && file.public_link ? file.public_link : '';
      resultImg.style.display = 'inline-block';
    }
  };

  let options = {
    //MODULES: ['UPLOAD', 'SEARCH'],   // optional default: 'UPLOAD', 'ICONS', 'SEARCH', 'BACKGROUNDS'
    //UPLOAD_PARAMS: {                 // optional default: {}
    //  dir: '/cities/minsk'
    //},
    //ELEMENT_ID: 'airstore-uploader', // optional default : 'airstore-uploader'
    UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132', // required
    CONTAINER: 'example',                           // required
    IS_SHOW_ADD_TAG_BTN: true,                      // optional
    IS_SHOW_NOT_RELEVANT_BTN: true,                 // optional
    onUpload: onUploadHandler,                      // required
  };

  window.onload = function() {
    if (window.AirstoreUploader) {
      window.AirstoreUploader.init(options);

      const openBtn = document.querySelector('.open-modal-btn');
      const initialTab = 'ICONS';
      if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open(initialTab);
    }
  }
})();