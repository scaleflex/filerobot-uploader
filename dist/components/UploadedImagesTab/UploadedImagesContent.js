var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img } from '../../styledComponents/index';
import { connect } from 'react-redux';
import { uploadFilesToDir, uploadFilesFromUrls, modalClose } from '../../actions';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';

var UploadedImagesContent = function (_Component) {
  _inherits(UploadedImagesContent, _Component);

  function UploadedImagesContent() {
    _classCallCheck(this, UploadedImagesContent);

    var _this = _possibleConstructorReturn(this, (UploadedImagesContent.__proto__ || Object.getPrototypeOf(UploadedImagesContent)).call(this));

    _this.getImageGridWrapperWidth = function () {
      return Math.floor(_this.imageGridWrapperRef.current.getBoundingClientRect().width);
    };

    _this.getImageGridWrapperHeight = function () {
      return _this.imageGridWrapperRef.current.getBoundingClientRect().height;
    };

    _this.updateImageGridColumnWidth = function () {
      var imageGrid = _this.state.imageGrid;
      var minColumnWidth = imageGrid.minColumnWidth,
          gutterSize = imageGrid.gutterSize;

      var imageGridWrapperWidth = _this.getImageGridWrapperWidth();
      var imageContainerHeight = _this.getImageGridWrapperHeight();

      imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

      _this.setState({ imageGridWrapperWidth: imageGridWrapperWidth, imageGrid: imageGrid, imageContainerHeight: imageContainerHeight });
    };

    _this.onKeyDown = function (event, item) {
      event.stopPropagation();
      _this.upload(item);
    };

    _this.upload = function (item) {
      _this.props.uploaderConfig.uploadHandler([_extends({}, item, { public_link: item.url_permalink })]);
      _this.props.onModalClose();
    };

    _this.renderImage = function (_ref) {
      var style = _ref.style,
          columnWidth = _ref.columnWidth,
          item = _ref.item;

      return React.createElement(
        ImageWrapper,
        {
          style: _extends({}, style, { width: columnWidth }),
          onClick: function onClick() {
            _this.upload(item);
          },
          onKeyDown: function onKeyDown(event) {
            _this.onKeyDown(event, item);
          }
        },
        React.createElement(Img, {
          src: ImageGridService.getFitResizeImageUrl(item.url_permalink, columnWidth, columnWidth / (item.ratio || 1.6)),
          height: columnWidth / (item.ratio || 1.6)
        })
      );
    };

    _this.renderUploadBox = function (_ref2) {
      var _ref2$style = _ref2.style,
          style = _ref2$style === undefined ? {} : _ref2$style,
          _ref2$columnWidth = _ref2.columnWidth,
          columnWidth = _ref2$columnWidth === undefined ? 300 : _ref2$columnWidth,
          _ref2$item = _ref2.item,
          item = _ref2$item === undefined ? {} : _ref2$item;
      var fileDropHandler = _this.props.fileDropHandler;
      var isDragOver = _this.state.isDragOver;


      return React.createElement(
        UploadBoxWrapper,
        {
          onDrop: fileDropHandler,
          method: 'post',
          encType: 'multipart/form-data',
          style: style,
          columnWidth: columnWidth,
          height: columnWidth / (item.ratio || 1.6)
        },
        React.createElement(
          UploadBox,
          { isDragOver: isDragOver },
          React.createElement(UploadBoxIcon, { className: 'sfi-airstore-image' }),
          React.createElement(
            Label,
            null,
            'Drag images here'
          )
        )
      );
    };

    _this.state = {
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 }
    };
    _this.imageGridWrapperRef = React.createRef();
    return _this;
  }

  _createClass(UploadedImagesContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateImageGridColumnWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth) this.updateImageGridColumnWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          files = _props.files,
          onDragEvent = _props.onDragEvent,
          isDragOver = _props.isDragOver;
      var _state = this.state,
          imageGrid = _state.imageGrid,
          imageContainerHeight = _state.imageContainerHeight,
          imageGridWrapperWidth = _state.imageGridWrapperWidth;
      var columnWidth = imageGrid.columnWidth,
          gutterSize = imageGrid.gutterSize;

      var imagesList = [{ id: 'uploaderBox' }].concat(_toConsumableArray(files));

      return React.createElement(
        Content,
        {
          innerRef: this.imageGridWrapperRef,
          onDragOver: function onDragOver(event) {
            onDragEvent(event, 'isDragOver', true);
          },
          onDragEnter: function onDragEnter(event) {
            onDragEvent(event, 'isDragOver', true);
          },
          onDragLeave: function onDragLeave(event) {
            onDragEvent(event, 'isDragOver', false);
          },
          onDragEnd: function onDragEnd(event) {
            onDragEvent(event, 'isDragOver', false);
          },
          isDragOver: isDragOver
        },
        files.length ? React.createElement(VirtualizedImagesGrid, {
          imageGridWrapperWidth: imageGridWrapperWidth,
          imageContainerHeight: imageContainerHeight,
          columnWidth: columnWidth,
          gutterSize: gutterSize,
          count: imagesList.length,
          list: imagesList,
          upload: this.upload,
          onShowMoreImages: this.onShowMoreImages,
          cellContent: function cellContent(props) {
            return props.item.id !== 'uploaderBox' ? _this2.renderImage(props) : _this2.renderUploadBox(props);
          }
        }) : this.renderUploadBox({})
      );
    }
  }]);

  return UploadedImagesContent;
}(Component);

export default connect(function (_ref3) {
  var uploaderConfig = _ref3.uploader.uploaderConfig;
  return { uploaderConfig: uploaderConfig };
}, function (dispatch) {
  return {
    onFilesUpload: function onFilesUpload(files, uploaderConfig, dataType, dir) {
      return dispatch(uploadFilesToDir(files, uploaderConfig, dataType, dir));
    },
    onFileUploadFromUrl: function onFileUploadFromUrl(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    },
    onModalClose: function onModalClose() {
      return dispatch(modalClose());
    }
  };
})(UploadedImagesContent);