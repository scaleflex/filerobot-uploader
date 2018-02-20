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
    //MODULES: ['UPLOAD', 'ICONS', 'BACKGROUNDS', 'ICONS'], // optional 'UPLOAD', 'ICONS', 'SEARCH', 'BACKGROUNDS'
    //UPLOAD_PARAMS: {
    //  dir: '/cities/minsk'  // optional
    //},
    UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132',
    CONTAINER: 'example',
    //ELEMENT_ID: 'airstore-uploader', // optional
    onUpload: onUploadHandler
  };

  window.onload = function() {
    if (window.AirstoreUploader) {
      window.AirstoreUploader.init(options);

      const openBtn = document.querySelector('.open-modal-btn');
      const initialTab = 'BACKGROUNDS';
      if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open(initialTab);
    }
  }
})();