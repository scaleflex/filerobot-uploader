export const checkIsValidExtension = (files, userExtensions, isFromWeb = false) => {
  let nextUserExtensions = processExtensions(userExtensions);
  let invalidExtensions = [];

  if (userExtensions.includes('jpeg')) nextUserExtensions = [...userExtensions, 'jpg'];
  else if (userExtensions.includes('jpg')) nextUserExtensions = [...userExtensions, 'jpeg'];

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