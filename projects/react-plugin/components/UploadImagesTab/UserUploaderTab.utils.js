export const checkIsValidExtension = (files, userExtensions, isFromWeb = false) => {
  let nextUserExtensions = [];
  let invalidExtensions = [];

  if (userExtensions.includes('jpeg')) nextUserExtensions = [...userExtensions, 'jpg'];
  else if (userExtensions.includes('jpg')) nextUserExtensions = [...userExtensions, 'jpeg'];

  const filesExtensions = isFromWeb ?
    [files.split('.').pop()]
      :
    [...files].map(file => file.type.split('/').pop());
  const isValid = filesExtensions.every(file => nextUserExtensions.includes(file));

  filesExtensions.forEach(file => {
    if (!nextUserExtensions.includes(file)) invalidExtensions.push(file);
  });

  return { isValid, invalidExtensions: invalidExtensions.join(", ") };
};