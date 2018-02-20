(function() {
  let options = {
    modules: ['USER_UPLOAD', 'SEARCH', 'BACKGROUNDS', 'ICONS'], // 'USER_UPLOAD', 'ICONS', SEARCH, BACKGROUNDS ...
    onUploadSrc: 'https://opendocs-content.api.airstore.io/v1/get/_/',
    onUpload: function (files = []) { // handler
      const [file] = files;
      const result = document.querySelector('.result');
      const resultImg = document.querySelector('.result-img');

      if (result) result.innerHTML = JSON.stringify(file || {}, null, 2);
      if (resultImg) {
        resultImg.src = file && file.public_link ? file.public_link : '';
        resultImg.style.display = 'inline-block';
      }
    },
    image_only: true,
    settings: {
      uploadPath: 'https://opendocs-content.api.airstore.io/upload',
      uploadParams: { opt_auth_upload_key: 'intpriv_997ab790fd93c0a9a7b471df561c276a373bc030&dir=_GENERATED' } /* HACK */
    }
  };

  try {
    const localOptions = require('/local.initial_options.js');

    if (localOptions && localOptions.default && typeof localOptions.default === 'object')
      options = { ...options, ...localOptions.default };

  } catch (e) {}

  window.onload = function() {
    if (window.AirstoreUploader) {
      window.AirstoreUploader.init(options);

      const openBtn = document.querySelector('.open-modal-btn');
      if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
    }
  }
})();