import '../../../projects/js-plugin/index';
import './style.css';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import './assets/fonts/helvetica-neue.css';
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

let loadedImage = null;
const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');
const jsBtn = document.getElementById('js-btn');
const reactBtn = document.getElementById('react-btn');
const jsBox = document.getElementById('js-version-box');
const reactBox = document.getElementById('react-version-box');
const innerSpinner = document.getElementById('inner-spinner');
const imageContainer = document.getElementById('image-container');
const buttonEdit = document.getElementById('edit-btn');
const image = document.getElementById('image-box');
const description = document.getElementById('image-description');
const robotIcon = document.getElementById('robot-icon');

jsBtn.onclick = function() {
  if (jsBtn.className.indexOf('btn-primary') === -1) {
    jsBtn.classList.remove('btn-light');
    jsBtn.classList.add('btn-primary');
    reactBtn.classList.remove('btn-primary');
    reactBtn.classList.add('btn-light');

    reactBox.style.display = 'none';
    jsBox.style.display = 'block';
  }
}

reactBtn.onclick = function() {
  if (reactBtn.className.indexOf('btn-primary') === -1) {
    reactBtn.classList.remove('btn-light');
    reactBtn.classList.add('btn-primary');
    jsBtn.classList.remove('btn-primary');
    jsBtn.classList.add('btn-light');

    jsBox.style.display = 'none'
    reactBox.style.display = 'block';
  }
}

let config = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
  uploadParams: {
    dir:"/dima_test_8_en"
    //dir:"/test-folder"
    //dir:"/test2" //frank
    //dir:"/test2_dir" //emil
  },
  container: 'fusqadtm', //M1_EDGY without tags
  filerobotUploadKey: '19692813e7364ef8ad6a6504d50a12ca',
  //container: 'ficttndm', //M1_EDGY with Tags field //emil
  //filerobotUploadKey: 'fc86c2afb6114856a31bcef9d299fccb',
  //container: 'fyeonxrm', //M0_LEGACY //frank
  //filerobotUploadKey: 'fa6d6f45f35844a7b01623c391fac260',
  initialTab: 'UPLOAD',
  folderBrowser: {
    show: true
  },
  autoCropSuggestions: true,
  closeOnEdit: false,
  preUploadImageProcess: true,
  processBeforeUpload: {
    operation: 'resize',
    widthLimit: 2000,
    heightLimit: 2000
  },
  tagging: {
    executeAfterUpload: true,
    autoTaggingButton: true,
    provider: 'google',
    confidence: 60,
    limit: 10,
    key: 'aaaa',
    customFields: [
      {
        name: 'Test name 1',
        metaKey: 'test_key',
        type: 'text'
      },
      {
        name: 'Test name 2',
        metaKey: 'test_key_2',
        type: 'textarea'
      }
    ],
    suggestionList: ['Color', 'Colored', 'Cobalt', 'Coral', 'Cobre']
  },
  language: 'en',
  colorScheme: {
    active: 'solarized'
  },
  extensions: ['jpg', 'png'],
  imageEditorConfig: {
   // processWithCloudimage: true,
   // filerobot: {
   //   token: 'fusqadtm',
   //   doNotPrefixURL: true
   // }
    watermark: {
      url: 'https://cdn.scaleflex.it/demo/filerobot.png',
      urls: [
        { url: 'https://cdn.scaleflex.it/demo/filerobot.png', label: 'filerobot logo' },
        'https://cdn.scaleflex.it/demo/superman.png'
      ],
      position: 'center',
      opacity: 0.7,
      applyByDefault: false,
      handleOpacity: true,
      fileUpload: true,
    }
  },
  modifyURLButton: true,
  deleteButton: true
};

// Configuration
//let config = {
//  modules: ['UPLOAD'],
//  uploadParams: { dir: '/images/aaa' },
//  container: 'fusqadtm',
//  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
//  platform: 'airstore',
//  initialTab: 'UPLOAD',
//  folderBrowser: true,
//    processBeforeUpload: {
//    operation: 'resize',
//    widthLimit: 1080,
//      heightLimit: 1080
//  },
//  language: 'en',
//  colorScheme: {
//    active: 'solarized'
//  }
//
//};

window.addEventListener('load', function() {
  const FilerobotUploaderInstance = FilerobotUploader.init(config, onUploadHandler);
  const homeOpenBtn = document.getElementById('edit-btn');

  homeOpenBtn.onclick = () => FilerobotUploaderInstance.open();
  image.onclick = () => FilerobotUploaderInstance.open();
});

function onUploadHandler(files, props = {}) {
  const img = files[0];
  const options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
  };
  const firstLoad = (img.created_at ? (new Date(img.created_at)) : new Date()).toLocaleTimeString("en", options);
  const lastModified = (img.modified_at ? (new Date(img.modified_at)) : new Date()).toLocaleTimeString("en", options);
  const publicURL = props.stage === 'modify' ? img.modified_url : img.url && img.url.public ? img.url.public : img.url_public;
  img.properties = img.properties || {};
  img.properties.tags = img.properties.tags || [];

  loadedImage = img;

  innerSpinner.style.display = 'block';
  imageContainer.style.opacity = '0.5';

  image.src = props.stage === 'modify' ? img.modified_url : (img.url && img.url.cdn || publicURL)
  image.onload = () => {
    innerSpinner.style.display = 'none';
    imageContainer.style.opacity = '1';
  }
  description.innerHTML = `
    <ul>
        <li>
          <span>File name: </span>
          <span>${img.name}</span>
        </li>
        <li>
          <span>${props.stage === 'modify' ? 'Modified URL' : 'Public link'}: </span>
          <span>${publicURL}</span>
        </li>
        <li>
          <span>CDN link: </span>
          <span>${img.url.cdn}</span>
        </li>
        <li>
          <span>Size: </span>
          <span>${img.size.pretty}</span>
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
          <span>${img.properties.description || 'not specified'}</span>
        </li>
        <li>
          <span>Tags: </span>
          <span>${img.properties.tags.default ? img.properties.tags.default.join(', ') : img.properties.tags.join(', ') || 'not specified'}</span>
        </li>
      </ul>
    `;
}

setTimeout(() => {
  wrapper.classList.add('active');
  spinner.style.display = 'none';
}, 400);

image.onmouseenter = onMouseEnter;
robotIcon.onmouseenter = onMouseEnter;
buttonEdit.onmouseenter = onMouseEnter;

image.onmouseleave = onMouseLeave;
robotIcon.onmouseleave = onMouseLeave;
buttonEdit.onmouseleave = onMouseLeave;

function onMouseEnter() {
  robotIcon.src = 'https://demo.cloudimg.io/width/500/q35.foil1/https://cdn.scaleflex.it/filerobot/assets/robot-with-smile-left.png';
}

function onMouseLeave() {
  robotIcon.src = 'https://demo.cloudimg.io/width/500/q35.foil1/https://cdn.scaleflex.it/filerobot/assets/robot-icon-left.png';
}
