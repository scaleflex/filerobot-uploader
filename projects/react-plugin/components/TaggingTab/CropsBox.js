import React, { Component, Fragment } from 'react';
import { CropsBoxWrapper, Group, GroupLabel, Overlay } from './TaggingTab.styled';
import { CloseBtn } from '../CloseBtn';
import smartcrop from 'smartcrop';
import { I18n } from 'react-i18nify';
import * as API from '../../services/api.service';
import { encodePermalink } from '../../utils';
import md5 from '../../utils/md5';
import { getPermalink } from '../../utils/adjustAPI.utils'


const OPTIONS_1x1 = [
  { height: 125, width: 125, debug: true, minScale: 1 },
  { height: 125, width: 125, debug: true, minScale: 0.88 },
  { height: 125, width: 125, debug: true, minScale: 0.77 },
  { height: 125, width: 125, debug: true, minScale: 0.65 }
];
const OPTIONS_5x4 = [
  { height: 125, width: 156.25, debug: true, minScale: 1 },
  { height: 125, width: 156.25, debug: true, minScale: 0.82 },
  { height: 125, width: 156.25, debug: true, minScale: 0.65 },
];
const OPTIONS_4x3 = [
  { height: 125, width: 166.7, debug: true, minScale: 1 },
  { height: 125, width: 166.7, debug: true, minScale: 0.82 },
  { height: 125, width: 166.7, debug: true, minScale: 0.65 },
];
const OPTIONS_3x2 = [
  { height: 125, width: 187.5, debug: true, minScale: 1 },
  { height: 125, width: 187.5, debug: true, minScale: 0.82 },
  { height: 125, width: 187.5, debug: true, minScale: 0.65 }
];
const OPTIONS_16x9 = [
  { height: 125, width: 222, debug: true, minScale: 1 },
  { height: 125, width: 222, debug: true, minScale: 0.82 },
  { height: 125, width: 222, debug: true, minScale: 0.65 }
];

class CropsBox extends Component {
  componentDidMount() {
    this.uploadSuccess(this.props.src);
  }

  processAutoCrop = (group, groupName, img) => {
    group.forEach((options, index) => {
      smartcrop.crop(img, options).then(result => {
        const crop = result.topCrop;
        const canvas = this.refs[`${groupName}${index}`];
        const ctx = canvas.getContext('2d');

        this[groupName] = this[groupName] || [];
        this[groupName][index] = crop;
        canvas.width = options.width;
        canvas.height = options.height;
        ctx.drawImage(
          img,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      });
    });
  }

  uploadSuccess = (src) => {
    const img = new Image();
    img.crossOrigin = '';
    img.src = this.props.src;

    img.onload = () => {
      this.processAutoCrop(OPTIONS_1x1, 'canvas_1x1_', img);
      this.processAutoCrop(OPTIONS_5x4, 'canvas_5x4_', img);
      this.processAutoCrop(OPTIONS_4x3, 'canvas_4x3_', img);
      this.processAutoCrop(OPTIONS_3x2, 'canvas_3x2_', img);
      this.processAutoCrop(OPTIONS_16x9, 'canvas_16x9_', img);
    }
  }

  uploadFromWeb = (url = null) => {
    const { config } = this.props.appState;
    const files = [url];
    const dataType = 'application/json';

    this.props.setSpinner(true);

    API.uploadFiles({
      files,
      config,
      data_type: dataType,
      showAlert: this.props.showAlert
    })
      .then(([files = [], isDuplicate, isReplacingData]) => {
        if (isReplacingData || isDuplicate) {
          this.props.showAlert('', I18n.t('upload.file_already_exists'), 'info');
        }

        const file = files[0] || {};
        this.uploadSuccess(`${encodePermalink(getPermalink(file))}?${md5(file.modified_at || '').split(0, 5)}`);

        this.props.saveUploadedFiles(files);
        this.props.setSpinner(false);
        this.props.toggleCropMenu();
      })
      .catch((error) => {
        this.props.setSpinner(false);
        this.props.showAlert('', error.msg, 'error');
      })
  };

  onCanvasClick = (groupName, index) => {
    const url = this.generateCloudimageURL(this[groupName][index]);

    this.uploadFromWeb(`${url}${this.props.src}`);
  }

  generateCloudimageURL = (cropParams = {}) => {
    const { config } = this.props.appState;
    const cloudUrl = config.cloudimageToken + '.cloudimg.io' + '/';

    let { width, height, x, y } = cropParams;

    const cropQ = x + ',' + y + ',' + (x + width) + ',' + (y + height) + '-' + width + 'x' + height;

    return `https://${cloudUrl}crop_px/${cropQ}/n/`;
  }

  renderCanvas = (index, groupName) => {
    return (
      <canvas
        onClick={() => { this.onCanvasClick(groupName, index); }}
        key={index}
        ref={`${groupName}${index}`}
      />
    )
  }

  render() {
    const { show } = this.props;

    return (
      <Fragment>
        {show && <Overlay onClick={this.props.toggleCropMenu}/>}
        <CropsBoxWrapper show={show}>
          <CloseBtn onClick={this.props.toggleCropMenu}/>

          <GroupLabel>1x1</GroupLabel>
          <Group>
            {OPTIONS_1x1.map((option, index) => this.renderCanvas(index, 'canvas_1x1_'))}
          </Group>
          <GroupLabel>5x4</GroupLabel>
          <Group>
            {OPTIONS_5x4.map((option, index) => this.renderCanvas(index, 'canvas_5x4_'))}
          </Group>
          <GroupLabel>4x3</GroupLabel>
          <Group>
            {OPTIONS_4x3.map((option, index) => this.renderCanvas(index, 'canvas_4x3_'))}
          </Group>
          <GroupLabel>3x2</GroupLabel>
          <Group>
            {OPTIONS_3x2.map((option, index) => this.renderCanvas(index, 'canvas_3x2_'))}
          </Group>
          <GroupLabel>16x9</GroupLabel>
          <Group>
            {OPTIONS_16x9.map((option, index) => this.renderCanvas(index, 'canvas_16x9_'))}
          </Group>
        </CropsBoxWrapper>
      </Fragment>
    )
  }
}

export default CropsBox;