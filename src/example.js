let options = (require('./config.js') || {}).default || {};

try {
  const localOptions = require('./local.initial_options.js');

  if (localOptions && localOptions.default && typeof localOptions.default === 'object')
    options = {...options, ...localOptions.default};

} catch (e) {}

(function() {
  if (window.AirstoreUploader) {
    window.AirstoreUploader.init(options);

    const openBtn = document.querySelector('.open-modal-btn');
    if (openBtn) openBtn.onclick = () => window.AirstoreUploader.open();
  }
})();