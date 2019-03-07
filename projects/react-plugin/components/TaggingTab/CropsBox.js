import React, { Component, Fragment } from 'react';
import { CropsBoxWrapper, Group, GroupLabel, Overlay } from './TaggingTab.styled';
import { CloseBtn } from '../CloseBtn';
import smartcrop from 'smartcrop';

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

  processAutoCrop = (group, groupName, img) => {
    group.forEach((options, index) => {
      smartcrop.crop(img, options).then(result => {
        const crop = result.topCrop;
        const canvas = this.refs[`${groupName}${index}`];
        const ctx = canvas.getContext('2d');

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

  render() {
    const { show } = this.props;

    return (
      <Fragment>
        {show && <Overlay onClick={this.props.toggleCropMenu}/>}
        <CropsBoxWrapper show={show}>
          <CloseBtn onClick={this.props.toggleCropMenu}/>

          <GroupLabel>1x1</GroupLabel>
          <Group>
            {OPTIONS_1x1.map((option, index) => <canvas key={index} ref={`canvas_1x1_${index}`}/>)}
          </Group>
          <GroupLabel>5x4</GroupLabel>
          <Group>
            {OPTIONS_5x4.map((option, index) => <canvas key={index} ref={`canvas_5x4_${index}`}/>)}
          </Group>
          <GroupLabel>4x3</GroupLabel>
          <Group>
            {OPTIONS_4x3.map((option, index) => <canvas key={index} ref={`canvas_4x3_${index}`}/>)}
          </Group>
          <GroupLabel>3x2</GroupLabel>
          <Group>
            {OPTIONS_3x2.map((option, index) => <canvas key={index} ref={`canvas_3x2_${index}`}/>)}
          </Group>
          <GroupLabel>16x9</GroupLabel>
          <Group>
            {OPTIONS_16x9.map((option, index) => <canvas key={index} ref={`canvas_16x9_${index}`}/>)}
          </Group>
        </CropsBoxWrapper>
      </Fragment>
    )
  }
}

export default CropsBox;