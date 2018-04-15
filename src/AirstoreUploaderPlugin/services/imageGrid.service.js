
export const getColumnCount = (containerWidth, columnWidth, gutterSize) =>
  Math.floor((containerWidth + gutterSize) / (columnWidth + gutterSize));

export const getColumnWidth = (containerWidth, columnCount, gutterSize) =>
  (containerWidth - ((columnCount - 1) * gutterSize)) / columnCount;


export const getActualColumnWidth = (containerWidth = 0, minColumnWidth = 200, gutterSize = 10) => {
  const columnCount =  getColumnCount(containerWidth, minColumnWidth, gutterSize);

  return getColumnWidth(containerWidth, columnCount, gutterSize);
};

export const getResizeImageUrl = (url = '', width = 300) => `//demo.cloudimg.io/width/${width}/s/${url}`;

export const getCropImageUrl = (url = '', width = 300, height = 200) =>
  `//demo.cloudimg.io/crop/${Math.round(width)}x${Math.round(height)}/s/${url}`;