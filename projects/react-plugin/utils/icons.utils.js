// We can get images here: https://www.flaticon.com/packs/file-types
const fileTypeIcons = {
  _default:   'https://image.flaticon.com/icons/png/128/136/136549.png',
  png:        'https://image.flaticon.com/icons/png/128/136/136523.png',
  jpeg:       'https://image.flaticon.com/icons/png/128/136/136524.png',
  svg:        'https://image.flaticon.com/icons/png/128/136/136537.png',
  html:       'https://image.flaticon.com/icons/png/128/136/136528.png',
  photoshop:  'https://image.flaticon.com/icons/png/128/136/136535.png',
  txt:        'https://image.flaticon.com/icons/png/128/136/136538.png',
  js:         'https://image.flaticon.com/icons/png/128/136/136530.png',
  css:        'https://image.flaticon.com/icons/png/128/136/136527.png',
  xml:        'https://image.flaticon.com/icons/png/128/136/136526.png',
  zip:        'https://image.flaticon.com/icons/png/128/136/136544.png',
  json:       'https://image.flaticon.com/icons/png/128/136/136525.png',
  csv:        'https://image.flaticon.com/icons/png/128/136/136534.png',
  avi:        'https://image.flaticon.com/icons/png/128/136/136546.png',
  mp4:        'https://image.flaticon.com/icons/png/128/136/136545.png',
  mp3:        'https://image.flaticon.com/icons/png/128/136/136548.png',
  iso:        'https://image.flaticon.com/icons/png/128/136/136541.png',
  exe:        'https://image.flaticon.com/icons/png/128/136/136531.png',
  rtf:        'https://image.flaticon.com/icons/png/128/136/136539.png',
  dbf:        'https://image.flaticon.com/icons/png/128/136/136533.png',
  dwg:        'https://image.flaticon.com/icons/png/128/136/136542.png',
  fla:        'https://image.flaticon.com/icons/png/128/136/136547.png',
};

const getFileType = fullType => {
  const availableTypes = Object.keys(fileTypeIcons).filter(_type => _type !== '_default');
  const checkType = _type => {
    if (fullType === 'text/plain' && _type === 'txt') return true;

    return (new RegExp(_type)).test(fullType);
  };

  return fullType ? availableTypes.find(_type => checkType(_type)) : null;
};

const getFileIconSrcByType = type => {
  const fileType = getFileType(type);

  return fileTypeIcons[fileType] || fileTypeIcons._default;
};

const isImage = type => type.indexOf('image') > -1;

export {
  getFileIconSrcByType,
  getFileType,
  isImage
}