import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from 'scaleflex-react-ui-kit/dist';

export const SidebarWrap = styled.div`
  width: 160px;
  border-right: 1px solid rgb(221, 221, 221);
  position: relative;
`;

export const SideBar = styled.div`
  overflow: auto;
  height: 100%;
  top: 0;
  position: absolute;
  width: 100%;
  padding-top: 5px;
  box-sizing: border-box;
`;

export const ColorType = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const ColorItem = styled.div`
  position: relative
  padding: 10px 5px;
  border-left: ${props => props.active ? '6px solid #00707c' : '6px solid transparent'};
  font-size: 12px;
  color: #1e262c;
  text-transform: capitalize;
  display: flex;
  cursor: pointer;
  background: ${props => props.active ? '#fff' : 'transparent'}
  
  :hover {
    background: #fff;
  }
`;

export const ColorItemName = styled.span`
  margin-left: 5px;
`;

export const TabWrap = styled.div`
  display: flex;
  height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  margin-top: 8px;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  transition: all 200ms ease-in;
  cursor: pointer;
  
  :hover img {
    transform: scale(1.1);
  }
  
  :after {
    visibility: hidden;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0);
    z-index: 1;
    transition: all 200ms ease-in;
  }
  
  :hover:after {
    visibility: visible;
    /*background: rgba(255, 255, 255, 0.3);*/
  }
`;

export const Img = styled.img`
  width: 100%;
  vertical-align: middle;
  height: ${props => props.height}px;
  opacity: 1;
  transition: all 0.3s;
  background: rgba(155, 155, 155, .15);
  -moz-transform: scale(1);
  transition: all 200ms ease-in;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  display: block;
  flexWrap: wrap;
  align-items: stretch;
  padding-right: 10;
  font-family: Roboto, sans-serif;
  flex: 1 1 0%;
  overflow: auto;
`;

export const ImagesListContainer = styled.div`
  padding: 0 10px;  
`;

export const AddColorBtn = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #ccc;
  margin: 5px 4px;
  border-radius: 4px;
  color: #70777f;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  
  :hover {
    border: 1px solid #7f7f7f;
    color: #3f3f3f;
  }
    
  ${props => props.hide && `display: none;`}
`;

export const SketchPickerWrapper = styled.div`
  position: absolute;
  z-index: 5;
`;

export const SketchPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ColorFilterItemWrapper = styled.div`
  display: inline-block;
  padding: 2px;
  padding-right: 15px;
  border-radius: 2px;
  background-color: #fff;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border: 1px solid #ccc;
`;

export const ColorFilterBox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background-color: ${props => props.color};
  border-radius: 2px;
`;

export const ColorFilterItem = (props) => (
  <ColorFilterItemWrapper>
    <ColorFilterBox color={props.color} onClick={() => { props.onChangeColorFilter(props.index) }}/>
    <CloseBtn
      onClick={() => { props.onRemoveColorFilter(props.index) }}
      style={{ top: 3, right: -2, color: '#ccc', zIndex: 4 }}
    />
  </ColorFilterItemWrapper>
);