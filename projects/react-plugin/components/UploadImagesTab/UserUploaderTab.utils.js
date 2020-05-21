import { I18n } from 'react-i18nify';


export const validateExtensions = (files, configExtensions, showAlert, isFromWeb) => {
  if (!configExtensions.length) return true;
  const { isValid, invalidExtensions = '' } = checkIsValidExtension(files, configExtensions, isFromWeb);

  if (isValid) {
    return true;
  } else if (!isValid && files) {
    const alert =
      `${I18n.t('upload.invalid_file_extension')}${invalidExtensions ? `: ${invalidExtensions}. ` +
        `${I18n.t('upload.accepted_file_types')}: ${processExtensions(configExtensions).join(', ')}.` : ''}`;
    showAlert('', alert, 'warning');
    return false;
  } else return false;
};

const checkIsValidExtension = (files, userExtensions, isFromWeb = false) => {
  let nextUserExtensions = processExtensions(userExtensions);
  let invalidExtensions = [];

  const filesExtensions = isFromWeb ?
    [files.split('.').pop()]
      :
    [...files].map(file => file.type.split('/').pop());
  const isValid = filesExtensions.every(ext => nextUserExtensions.some(userExt => ext.includes(userExt)));

  filesExtensions.forEach(file => {
    if (!nextUserExtensions.includes(file)) invalidExtensions.push(file);
  });

  return { isValid, invalidExtensions: invalidExtensions.join(", ") };
};

export const processExtensions = userExtensions => {
  let nextUserExtensions = [];
  if (userExtensions.includes('jpeg')) nextUserExtensions = [...userExtensions, 'jpg'];
  else if (userExtensions.includes('jpg')) nextUserExtensions = [...userExtensions, 'jpeg'];

  return nextUserExtensions;
};