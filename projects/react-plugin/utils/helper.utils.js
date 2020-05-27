const deepCopy = object => JSON.parse(JSON.stringify(object));

const cursorToEnd = contentEditableElement => {
  let range, selection;
  if (document.createRange) // Firefox, Chrome, Opera, Safari, IE 9+
  {
    range = document.createRange(); // Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
    range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); // get the selection object (allows you to change selection)
    selection.removeAllRanges(); // remove any selections already made
    selection.addRange(range); // make the range you have just created the visible selection
  }
  else if (document.selection) // IE 8 and lower
  {
    range = document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
    range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
    range.select(); // Select the range (make it the visible selection
  }
};

const isEnterClick = event => event && (event.which || event.keyCode) === 13;

const isEsc= event => event && (event.which || event.keyCode) === 27;

const uniqueArrayOfStrings = array => array.filter((v, i, a) => a.indexOf(v) === i)

const uniqueArrayOfStringsInObject = object => {
  const nextObject = {};
  Object.keys(object).forEach(key => nextObject[key] = object[key].filter((v, i, a) => a.indexOf(v) === i))

  return nextObject;
};

const nonUniqueArrayOfStrings = (tags, itemAmounts) => {
  const commonTags = [];
  const duplicates = tags.reduce((tag, value) => ({
    ...tag,
    [value]: (tag[value] || 0) + 1
  }), {});

  Object.keys(duplicates).forEach(key => {
    if (duplicates[key] === itemAmounts) commonTags.push(key)
  });

  return commonTags;
}

const isDefined = param => typeof param !== 'undefined';

const encodePermalink = link => link; // link.replace(/\?/g, '%3F');

export {
  uniqueArrayOfStrings,
  nonUniqueArrayOfStrings,
  uniqueArrayOfStringsInObject,
  isEnterClick,
  cursorToEnd,
  deepCopy,
  isEsc,
  isDefined,
  encodePermalink
}