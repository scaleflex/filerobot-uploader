import { send } from '../services/api.service';

const POST_MAX_FILESIZE_MB = 450;
const POST_MAX_REQUEST_MULTI_FILES_SIZE_MB = 10;
const MAX_FILES_COUNT_PER_REQUEST = 10;

/**
 * https://docs.airstore.io/go/airstore-public-documentation/en/airstore-api-reference/upload-files#od_fae16fa2
 */
export const uploadFormDataFiles = (formData, url, onUploadProgress, requestOptions = {}) => {
  // Handle the most slow request
  function handleUploadProgress(id) {
    return progress => {
      requestsProgressPercent[id] = {
        ...(requestsProgressPercent[id] || {}),
        loaded: progress.loaded,
        total: progress.total,
        progress: progress.loaded / progress.total,
      };

      const requestsProgressPercentArray = Object.keys(requestsProgressPercent)
        .map(propName => requestsProgressPercent[propName] || {});
      let mostSlowRequest = requestsProgressPercentArray[0];

      requestsProgressPercentArray.forEach(item => {
        if (item.progress < mostSlowRequest.progress) {
          mostSlowRequest = item;
        }
      });

      onUploadProgress(mostSlowRequest);
    }
  }

  const requestsProgressPercent = {};
  const putFiles = [];
  const postFiles = [];
  const postFilesChunks = []; // chunk size limit === POST_MAX_FILESIZE_MB

  [...formData.getAll('files[]')].forEach(file =>
    (bytesToMb(file.size) <= POST_MAX_FILESIZE_MB ? postFiles : putFiles).push(file)
  );

  // Sort from small to large, for better chunking
  postFiles.sort((a, b) => a.size === b.size ? 0 : (a.size < b.size ? -1 : 1));

  // Chunking post files
  while (postFiles.length > 0) {
    /**
     * In chunk can be one file (for ex. 200MB) or max 10 files with total size <= 10MB
     */
    const chunk = [postFiles.pop()];
    let i = postFiles.length;

    if (bytesToMb(filesTotalBytesSize(chunk)) < POST_MAX_REQUEST_MULTI_FILES_SIZE_MB) {
      while (i--) {
        if (bytesToMb(filesTotalBytesSize(chunk) + postFiles[i].size) <= POST_MAX_REQUEST_MULTI_FILES_SIZE_MB) {
          chunk.push(postFiles.splice(i, 1)[0]);

          if (chunk.length === MAX_FILES_COUNT_PER_REQUEST) {
            break;
          }
        }
      }
    }

    postFilesChunks.push(chunk);
  }

  const promises = [
    ...putFiles.map((file, index) =>
      send(
        `${url}${/\?/.test(url) ? '&' : '?'}filename=${file.name}`,
        'PUT', file, {}, 'json',
        {
          ...requestOptions,
          onUploadProgress: handleUploadProgress(`put-${index}`),
          headers: {
            'Content-Type': isJson ? 'application/json' : 'multipart/form-data',
            ...((requestOptions || {}).headers || {})
          }
        }
      )
    ),

    ...postFilesChunks.map((chunk, index) => {
      const postChunkFormData = new FormData();
      chunk.forEach(file => postChunkFormData.append("files[]", file));

      return send(
        url, 'POST', postChunkFormData, {}, 'json',
        {
          ...requestOptions,
          onUploadProgress: handleUploadProgress(`post-chunk-${index}`),
          headers: {
            'Content-Type': 'multipart/form-data',
            ...((requestOptions || {}).headers || {})
          }
        }
      );
    })
  ];

  return Promise.all(promises)
    // .then(responses => {
    //   const files = [];

    //   responses.forEach(response => {
    //     if (response && response.file) {
    //       files.push(response.file);
    //     } else if (response && response.files) {
    //       files.concat(response.files);
    //     }
    //   });

    //   return { files, responses };
    // });
};


/**
 * @param {number} bytes
 */
function bytesToMb(bytes) {
  return bytes / 1000000;
}

/**
 * @param {File[]} fileList
 */
function filesTotalBytesSize(fileList = []) {
  return fileList.map(file => file.size).reduce((a, b) => a + b)
}
