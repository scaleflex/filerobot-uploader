export default {
  MODULES: ['UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'], // 'UPLOAD', 'UPLOADED_IMAGES', 'ICONS_GALLERY', 'IMAGES_GALLERY'
  AIRSTORE_UPLOAD_KEY: '',
  CONTAINER: null,
  UPLOAD_PARAMS: {},
  onUpload: null, // handler
  image_only: true,
  OPENPIX_KEY: null
};

export const DEFAULT_ICON_SIZE = 100;

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