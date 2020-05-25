
export const getColumnCount = (containerWidth, columnWidth, gutterSize) =>
  Math.floor((containerWidth + gutterSize) / (columnWidth + gutterSize));

export const getColumnWidth = (containerWidth, columnCount, gutterSize) =>
  (containerWidth - ((columnCount - 1) * gutterSize)) / columnCount;


export const getActualColumnWidth = (containerWidth = 0, minColumnWidth = 200, gutterSize = 10) => {
  const columnCount =  getColumnCount(containerWidth, minColumnWidth, gutterSize);

  return getColumnWidth(containerWidth, columnCount, gutterSize);
};

export const getResizeImageUrl = (url = '', width = 300, cloudimageToken = 'demo') =>
  `https://${cloudimageToken}.cloudimg.io/v7/${processUrl(url)}w=${Math.round(width)}`;

export const getFitResizeImageUrlWithCIcdn = (url = '', width = 300, height = 200, cloudimageToken = 'demo') =>
  `https://${cloudimageToken}.cloudimg.io/v7/${processUrl(url)}func=fit&bg_color=ffffff&w=${Math.round(width)}&h=${Math.round(height)}`;

export const getFitResizeImageUrl = (url = '', width = 300, height = 200, cloudimageToken = 'demo') =>
  `${processUrl(url)}func=fit&bg_color=ffffff&w=${Math.round(width)}&h=${Math.round(height)}`;

export const getCropImageUrl = (url = '', width = 300, height = 200, cloudimageToken = 'demo') =>
  `https://${cloudimageToken}.cloudimg.io/v7/${processUrl(url)}func=crop&w=${Math.round(width)}&h=${Math.round(height)}`;

const processUrl = url => url.includes('?') ? `${url}&` : `${url}?`;