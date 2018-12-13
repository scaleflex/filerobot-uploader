'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BackgroundTab = require('./BackgroundTab.styled');

Object.keys(_BackgroundTab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BackgroundTab[key];
    }
  });
});

var _IconTab = require('./IconTab.styled');

Object.keys(_IconTab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IconTab[key];
    }
  });
});

var _UploadedImages = require('./UploadedImages.styled');

Object.keys(_UploadedImages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UploadedImages[key];
    }
  });
});

var _AirstoreUploader = require('./AirstoreUploader.styled');

Object.keys(_AirstoreUploader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AirstoreUploader[key];
    }
  });
});