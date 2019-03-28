import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Circle } from 'rc-progress';

export const PROGRESS_COLORS = {
  DEFAULT: 'rgb(81,185,244)',
  SUCCESS: 'RGB(133,192,83)'
};

export const ProgressCircle = ({ status, color }) => (
  <Fragment>
    <Overlay fullScreen={true} overlay={true} color="rgba(125, 125, 125, 0.84) "/>
    <ProgressCircleWrapper>
      <Circle
        percent={status}
        strokeWidth="4"
        trailWidth="4"
        strokeColor={color}
        width={200}
        height={200}
      />
      <Status>{status} %</Status>
    </ProgressCircleWrapper>
  </Fragment>
);


const ProgressCircleWrapper = styled.div`
  position: absolute;
  
  svg {
    width: 200px;
    height: 200px;
    position: relative;
    z-index: 10000;
  }
`;

const Status = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -10px;
  top: 50%;
  z-index: 11111;
  color: #fff;
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background: ${props => props.overlay ? (props.color ? 'rgba(125, 125, 125, 0.84) ' : 'rgba(10,10,10,0.26)') : 'transparent'} !important;
  z-index: 1042;
`;