export default {
  modules: ['USER_UPLOAD', 'SEARCH', 'BACKGROUNDS', 'ICONS'], // 'USER_UPLOAD', 'ICONS', SEARCH, BACKGROUNDS ...
  onUploadSrc: 'https://opendocs-content.api.airstore.io/v1/get/_/',
  onUpload: null, // handler
  image_only: true,
  settings:   {
    uploadPath: 'https://opendocs-content.api.airstore.io/upload',
    uploadParams: { opt_auth_upload_key: 'intpriv_997ab790fd93c0a9a7b471df561c276a373bc030&dir=_GENERATED' } /* HACK */
  }
}
