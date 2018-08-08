import React from 'react';


export default class FileUpload extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    admin: true
  }

  openUpload() {
    let options = {
      MODULES: ['UPLOAD', 'IMAGES_GALLERY'],  // optional default: 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
      UPLOAD_PARAMS: {                        // optional default: {}
        dir: '/image-test'
      },
      //UPLOADED_FOLDERS: [ // required if UPLOADED_IMAGES is set
      //  { dir: '/image-test', label: 'Image Test' },
      //  { dir: '/image', label: 'Image' }
      //],
      OPENPIX_KEY: '51b610f359ed40c4b35e153f5d441469',
      //ELEMENT_ID: 'airstore-uploader',                        // optional default : 'airstore-uploader'
      AIRSTORE_UPLOAD_KEY: '1f93a27eff70482b9ee2ba1fce0cf810',  // required
      CONTAINER: 'vacationpropertiesforless',                   // required
      onUpload: this.handleSubmit.bind(this)                    // required
    }
    window.AirstoreUploader.init(options);
    window.AirstoreUploader.open();
  }

  handleSubmit(props) {
    const uploadDetails = this.props;
    console.log(uploadDetails, props);

    let photoId
    let largest = ResortPhotos.find({ id: uploadDetails.id }).fetch().length - 1
    _.map(props, function(photo){
      photoId = ResortPhotos.insert({
        url: photo.url_public,
        type: uploadDetails.type,
        id: uploadDetails.id,
        order: largest
      });
      console.log(photoId);
      uploadDetails.addNew(photoId)
    });
  }

  render() {
    return (
      <div>
        <Script url="//js.filerobot.com/airstore-uploader.last.js"/>
        <div>
          <Button onClick={this.openUpload.bind(this)}>Upload Photos</Button>
        </div>
        <div id="airstore-uploader"/>
      </div>
    )
  }
}