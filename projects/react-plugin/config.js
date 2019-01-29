export default {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY'],
  initialTab: 'UPLOAD',
  container: 'example',
  elementID: 'airstore-uploader',
  filerobotUploadKey: '',
  uploadParams: {
    dir: '/'
  },
  openpixKey: null,
  language: 'en',
  folderBrowser: true,
  tagging: {
    executeAfterUpload: false,
    autoTaggingButton: false,
    provider: 'google',
    confidence: 80,
    limit: 10,
    key: ''
  },
  onUpload: () => {},
};

export const DEFAULT_ICON_SIZE = 100;
export const GALLERY_IMAGES_LIMIT = 50;
export const DUPLICATE_CODE = 'SHA1_CONFLICT_STOP_UPLOAD';
export const REPLACING_DATA_CODE = 'FILE_EXISTS_REPLACING_DATA';

export const COLORS = [
  '#96dc52',
  '#016df0',
  '#943dc5',
  '#feda48',
  '#d90028',
  '#ffffff',
  '#000000'
];

const DEFAULT_TAGS = [
  'accessibility',
  'arrows',
  'Audio & Video',
  'Business',
  'Charity',
  'Chat',
  'Chess',
  'Code',
  'Communication',
  'Computers',
  'Currency',
  'Date & Time',
  'Design',
  'Editors',
  'Files',
  'Genders',
  'Hands',
  'Health',
  'Images',
  'Interfaces',
  'Logistics',
  'Maps',
  'Medical',
  'Moving',
  'Objects',
  'Payments & Shopping',
  'Shapes',
  'Spinners',
  'Sports',
  'Status',
  'Users & People',
  'Vehicles',
  'Writing'
]