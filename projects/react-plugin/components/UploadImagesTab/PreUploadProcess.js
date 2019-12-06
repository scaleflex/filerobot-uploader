import React, { Component, Fragment } from 'react';
import {
  ActiveOperation,
  ButtonAction,
  ButtonApplyTransforms,
  Container,
  OperationInput,
  PreviewFiles,
  PreviewFileWrapper,
  PreviewLabel,
  TransformationList
} from './UserUploaderTab.styled';
import { I18n } from 'react-i18nify';
import Script from 'react-load-script';
import { Spinner } from '../Spinner';
import { b64toBlob } from '../../utils/imageTransformation.utils';
import smartcrop from 'smartcrop';
import prettyBytes from 'pretty-bytes';


const OPERATION = {
  SMART_CROP: 'smart_crop',
  FACE_DETECTION: 'face_detection',
  RESIZE: 'resize'
};

class PreUploadProcess extends Component {
  loadedPreviewImages = 0;

  constructor() {
    super();

    this.state = {
      cropResizeMenu: false,
      faceDetectionLoaded: false,
      previewBoxParams: {
        width: 'auto',
        height: 'auto'
      },
      imagesParams: {
        width: 300,
        height: 300
      },
      operation: OPERATION.SMART_CROP,
      processing: false,
      camanLoaded: false
    }
  }

  componentWillUnmount() {
    this.setState({
      operation: OPERATION.SMART_CROP
    });
  }

  getPreviewFileWrapperHeight = ({ isAutoProcess }) => {
    if (!this._previewBox) return 'none';

    const columnDivider = isAutoProcess ? 4 : 2;

    return this._previewBox.offsetWidth / columnDivider / 1.27 - 20;
  }

  onPreviewImageLoad = () => {
    this.loadedPreviewImages += 1;

    if (this.loadedPreviewImages === this.props.imagesToUpload.length - 1) {
      // images loaded
    }
  }

  cropImages = () => {
    const elements = [...this._previewBox.children];
    this.elementsLength = elements.length;
    this.processedElements = 0;

    elements.forEach((wrapper) => {
      const { width, height } = this.state.imagesParams;

      smartcrop.crop(wrapper.children[0], { width, height, minScale: 1 }, (result) => {
        this.draw(result, wrapper.children[0]);
      });

    })
  }

  resizeImages = (callback) => {
    const self = this;
    const elements = [...this._previewBox.children];
    this.elementsLength = elements.length;
    this.processedElements = 0;

    elements.forEach((wrapper) => {
      const { width, height } = this.state.imagesParams;
      const image = wrapper.children[0];

      window.Caman(image, function () {
        self.processedElements += 1;

        if (!(width < image.width || height < image.height)) {
          if (self.elementsLength === self.processedElements) {
            self.setState({ processing: false });
            if (callback) callback();
          }

          return;
        }

        const portraitImage = image.height > image.width;
        let resizeParams = {};

        if (width === 'auto' || height === 'auto') {
          resizeParams = {
            width: width === 'auto' ? undefined : width,
            height: height === 'auto' ? undefined : height
          };
        } else if (portraitImage) {
          resizeParams.height = height;
        } else {
          resizeParams.width = width;
        }

        this
          .resize(resizeParams)
          .render(() => {
            if (self.elementsLength === self.processedElements) {
              self.setState({ processing: false });
              if (callback) callback();
            }
          });
      });
    });
  }

  draw = (result, img) => {
    const { topCrop: { height, width, x, y } = {} } = result;
    const self = this;

    window.Caman(img, function () {
      self.processedElements += 1;

      this
        .crop(width, height, x, y)
      this.resize({ width: self.state.imagesParams.width, height: self.state.imagesParams.height })
      this.render();

      if (self.elementsLength === self.processedElements) {
        self.setState({ processing: false });
      }
    });
  }

  updateImagesParams = (event) => {
    this.setState({
      imagesParams: {
        ...this.state.imagesParams,
        [event.target.name]: event.target.value
      }
    });
  }

  resetCanvasImages = (callback = () => {}) => {
    this.loadedPreviewImages = 0;
    const nextImagesToUpload = [...this.props.imagesToUpload];

    this.props.updateImagesToUpload(nextImagesToUpload, callback);
  }

  applyTransformations = () => {
    this.setState({ processing: true });

    this.resetCanvasImages(
      this.getCurrentOperationCallback()
    );
  }

  getCurrentOperationCallback = () => {
    switch (this.state.operation) {
      case OPERATION.SMART_CROP:
        return this.cropImages;
      case OPERATION.FACE_DETECTION:
        return this.aceDetectionOpenCV;
      case OPERATION.RESIZE:
        return this.resizeImages;
    }
  }

  showCropResizeMenu = () => {
    this.setState({
      processing: true,
      cropResizeMenu: true
    }, this.cropImages);
  }

  onRest = () => {
    this.setState({ cropResizeMenu: false, operation: OPERATION.SMART_CROP });
    this.resetCanvasImages();
  }

  activateFaceDetection = () => {
    let size = {};
    this.setState({ processing: true });

    if (this.state.operation === OPERATION.RESIZE) {
      size = {
        width: 300,
        height: 300
      }
    }

    this.resetCanvasImages(() => {
      this.setState({
        operation: OPERATION.FACE_DETECTION,
        operationOpen: false,
        imagesParams: {
          ...this.state.imagesParams,
          ...size
        }
      }, () => {
        this.aceDetectionOpenCV();
      });
    });
  }

  activateSmartCrop = () => {
    let size = {};
    this.setState({ processing: true });

    if (this.state.operation === OPERATION.RESIZE) {
      size = {
        width: 300,
        height: 300
      }
    }

    this.resetCanvasImages(() => {
      this.setState({
        operation: OPERATION.SMART_CROP,
        operationOpen: false,
        imagesParams: {
          ...this.state.imagesParams,
          ...size
        }
      }, this.cropImages);
    });
  }

  activateResize = () => {
    this.setState({ processing: true });

    this.resetCanvasImages(() => {
      this.setState({
        operation: OPERATION.RESIZE,
        operationOpen: false,
        imagesParams: {
          ...this.state.imagesParams,
          height: 'auto'
        }
      }, this.resizeImages);
    });
  }


  prescaleImage = (image, maxDimension, callback) => {
    let width = image.naturalWidth || image.width;
    let height = image.naturalHeight || image.height;

    if (width < maxDimension && height < maxDimension) return callback(image, 1);

    let scale = Math.min(maxDimension / width, maxDimension / height);
    let canvas = document.createElement('canvas');

    canvas.width = ~~(width * scale);
    canvas.height = ~~(height * scale);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

    let result = document.createElement('img');

    result.onload = function () {
      callback(result, scale);
    };
    result.src = canvas.toDataURL();
  }


  aceDetectionOpenCV = () => {
    const { width, height } = this.state.imagesParams;
    const elements = [...this._previewBox.children];
    const self = this;
    this.processedElements = 0;
    let result = [];
    let options = {
      width: width * 1,
      height: height * 1,
      minScale: 0.2
    };

    elements.forEach((wrapper, index) => {
      const img = wrapper.children[0];
      let nextOptions = options;

      this.prescaleImage(img, 768, function (img, scale) {
        let src = window.cv.imread(img);
        let gray = new window.cv.Mat();

        window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY, 0);
        let faces = new window.cv.RectVector();
        let faceCascade = new window.cv.CascadeClassifier();
        // load pre-trained classifiers
        faceCascade.load('haarcascade_frontalface_default.xml');
        // detect faces
        let msize = new window.cv.Size(0, 0);
        // let c = document.createElement('canvas');
        // cv.imshow(c, gray);
        // document.body.appendChild(c)
        faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
        nextOptions.boost = [];

        for (let i = 0; i < faces.size(); ++i) {
          const face = faces.get(i);
          nextOptions.boost.push({
            x: face.x / scale,
            y: face.y / scale,
            width: face.width / scale,
            height: face.height / scale,
            weight: 1.0
          });
        }

        src.delete();
        gray.delete();
        faceCascade.delete();
        faces.delete();
        result.push(nextOptions);

        const image = self._previewBox.children[index].children[0];

        smartcrop.crop(image, nextOptions, (result) => {
          self.draw(result, image);
        });
      });
    });
  }

  onLoadCaman = () => {
    const { config } = this.props.appState;

    if (config.processBeforeUpload && config.processBeforeUpload.operation === 'resize') {
      const { widthLimit, heightLimit } = config.processBeforeUpload;

      this.setState({
        cropResizeMenu: true,
        camanLoaded: true,
        imagesParams: { width: widthLimit, height: heightLimit }
      }, () => {
        this.resizeImages(this.applyTransformationsAndUpload);
      });
    } else {
      this.setState({ camanLoaded: true });
    }
  }

  onOpenCVLoad = () => {
    if (window.__loadCascade) {
      this.setState({ faceDetectionLoaded: true });

      return;
    }

    window.__loadCascade = true;

    this.loadCascade(
      'haarcascade_frontalface_default.xml',
      'https://unpkg.com/opencv.js@1.2.1/tests/haarcascade_frontalface_default.xml',
      () => { this.setState({ faceDetectionLoaded: true }); }
    );
  }

  loadCascade = (path, url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const data = new Uint8Array(request.response);
          window.cv.FS_createDataFile('/', path, data, true, false, false);
          callback();
        } else {
          self.printError(
            'Failed to load ' + url + ' status: ' + request.status
          );
        }
      }
    };
    request.send();
  }

  applyTransformationsAndUpload = () => {
    if (!this.state.cropResizeMenu) {
      this.props.upload();

      return;
    }

    const elements = [...this._previewBox.children].map(wrapper => wrapper.children[0]);
    const files = [];
    const self = this;
    let imagesLength = elements.length;
    let processedImages = 0;

    elements.forEach((canvas, index) => {
      window.Caman(canvas, function () {
        this.render(function () {
          const contentType = self.props.imagesToUpload[index].file.type;
          const base64 = this.canvas.toDataURL(contentType);
          const block = base64.split(";");
          const realData = block[1].split(",")[1];
          const blob = b64toBlob(realData, contentType, null);

          blob.name = self.props.imagesToUpload[index].file.name;
          files.push(blob);
          processedImages += 1;

          if (imagesLength === processedImages) {
            self.props.updateFilesAndUpload(files)
          }
        });
      })
    })
  }

  onOperationInputFocus = (event) => {
    if (this.state.operation === OPERATION.RESIZE) {
      const oppositeProp = event.target.name === 'height' ? 'width' : 'height';

      if (this.state.imagesParams[oppositeProp] === 'auto') return;

      this.setState({
        imagesParams: {
          [event.target.name]: 300,
          [oppositeProp]: 'auto'
        }
      });
    }
  }

  render() {
    const {
      cropResizeMenu, operationOpen, operation, faceDetectionLoaded, imagesParams, processing, camanLoaded
    } = this.state;
    const { imagesToUpload, appState } = this.props;
    const isAutoProcess = appState.config.processBeforeUpload;
    const previewHeight = this.getPreviewFileWrapperHeight({ isAutoProcess });
    const size =
      prettyBytes(imagesToUpload.reduce((accumulator, image) => accumulator + image.file.size, 0));
    const oneImage = imagesToUpload.length === 1;

    return (
      <Container noBorder>
        <PreviewFiles isAutoProcess={isAutoProcess} ref={node => this._previewBox = node} oneImage={oneImage}>
          {imagesToUpload.map((image, index) =>
            <PreviewFileWrapper
              key={index}
              oneImage={oneImage}
              isAutoProcess={isAutoProcess}
              h={previewHeight === 'none' ? 'none' : parseInt(previewHeight)}
            >
              <img src={image.src} alt="" onLoad={this.onPreviewImageLoad}/>
              <div>{image.file.name}</div>
            </PreviewFileWrapper>
          )}
        </PreviewFiles>

        {!isAutoProcess &&
        <div style={{ width: '350px', maxHeight: '100%', overflow: 'hidden', overflowY: 'auto' }}>

          {cropResizeMenu &&
          <Fragment>
            <PreviewLabel htmlFor="operation">Operation</PreviewLabel>
            <TransformationList name="operation" onMouseLeave={() => { this.setState({ operationOpen: false }); }}>
              <ActiveOperation
                as="div"
                className={`active-option${operationOpen ? ' active' : ''}`}
                onClick={() => { this.setState({ operationOpen: !this.state.operationOpen }); }}
              >
                {I18n.t(`upload.${operation}`)}
              </ActiveOperation>

              <div className={`options${operationOpen ? ' active' : ''}`}>
                <div
                  className={`item${operation === OPERATION.SMART_CROP ? ' active' : ''}`}
                  onClick={this.activateSmartCrop}
                >{I18n.t('upload.smart_crop')}</div>
                <div
                  className={`item${operation === OPERATION.FACE_DETECTION ? ' active' : ''}${!faceDetectionLoaded ? ' disabled' : ''}`}
                  onClick={this.activateFaceDetection}
                >{I18n.t('upload.face_detection')} <Spinner fz="4px" show={!faceDetectionLoaded}/></div>

                <div
                  className={`item${operation === OPERATION.RESIZE ? ' active' : ''}`}
                  onClick={this.activateResize}
                >{I18n.t('upload.resize')}</div>
              </div>
            </TransformationList>

            <PreviewLabel htmlFor="width">{I18n.t(`upload.width`)}</PreviewLabel>
            <OperationInput
              name="width"
              value={imagesParams.width}
              onClick={this.onOperationInputFocus}
              onChange={this.updateImagesParams}
            />

            <PreviewLabel htmlFor="height">{I18n.t(`upload.height`)}</PreviewLabel>
            <OperationInput
              name="height"
              value={imagesParams.height}
              onClick={this.onOperationInputFocus}
              onChange={this.updateImagesParams}
            />

            <div>
              <ButtonApplyTransforms
                key="reset"
                className="ae-btn"
                style={{ marginRight: 10 }}
                onClick={this.onRest}
              >{I18n.t(`upload.revert`)}</ButtonApplyTransforms>

              <ButtonApplyTransforms
                key="apply"
                className="ae-btn"
                onClick={this.applyTransformations}
              >{I18n.t(`upload.apply`)}</ButtonApplyTransforms>
            </div>

          </Fragment>}

          {!cropResizeMenu &&
          <Fragment>
            <ButtonApplyTransforms
              key="crop_resize"
              className="ae-btn"
              style={{ width: 300 }}
              onClick={this.showCropResizeMenu}
            >{I18n.t(`upload.crop_and_resize`)}</ButtonApplyTransforms>

            <ButtonApplyTransforms
              key="cancel"
              className="ae-btn"
              style={{ width: 300 }}
              onClick={this.props.cancelUpload}
            >{I18n.t(`upload.cancel`)}</ButtonApplyTransforms>
          </Fragment>
          }

          <ButtonAction
            key="ok"
            className="ae-btn"
            style={{ width: 300 }}
            onClick={this.applyTransformationsAndUpload}
          >{I18n.t('upload.upload_btn')}</ButtonAction>

          <div style={{ marginTop: '5px' }}>
            <p>{I18n.t('upload.selected_files')}: {imagesToUpload.length}, {I18n.t('upload.total_size')}: {size}</p>
          </div>
        </div>
        }

        {(processing || !camanLoaded || isAutoProcess) && <Spinner overlay show={true}/>}

        {!isAutoProcess &&
        <Script
          onLoad={this.onOpenCVLoad}
          url="https://unpkg.com/opencv.js@1.2.1/opencv.js"
          integrity="sha384-ucXOxPgA5tSKdaZgFD+5C0lAJeavjW31veENhNvOwsTjgx8waDD0s1QcMdUxhlxk"
          crossorigin="anonymous"
        />}

        <Script
          onLoad={this.onLoadCaman}
          url="https://cdn.scaleflex.it/plugins/common/libs/caman.full.min.js"
          crossorigin="anonymous"
        />
      </Container>
    );
  }
}

export default PreUploadProcess;