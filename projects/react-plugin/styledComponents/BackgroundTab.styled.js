import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from '../components/CloseBtn';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { ButtonSearch } from './IconTab.styled';

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

export const ColorItem = styled.div.attrs(props => ({ className: props.active ? 'ae-color-item' : '' }))`
  position: relative;
  padding: 10px 5px;
  border-left: ${props => props.active ? '6px solid ' + props.theme.buttonBackground : '6px solid transparent'};
  font-size: 12px;
  color: ${p => p.theme.text || '#1e262c'};
  text-transform: capitalize;
  display: flex;
  cursor: pointer;
  background: ${props => props.active ? props.theme.activeSidebarItemBackground : 'transparent'};
  
  :hover {
    background: ${props => props.theme.activeSidebarItemBackground || '#fff'};
  }
`;

export const ColorItemName = styled.span`
  margin-left: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TabWrap = styled.div`
  display: flex;
  height: 100%;
`;

export const ControlWrapper = styled('div')`
  display: none;
  width: 33%;
  padding: 2px;
  z-index: 50;
  text-align: center;
  
  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-right: 0;
  }
`;

export const Control = styled('div')`
  border-radius: 6px;
  border: 1px solid #fff;
  font-size: 10px;
  color: #acacac;
  padding-top: 3px;
  
  min-height: 70px;
  text-align: center;

  :hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`;

export const Icon = styled('span')`
  display: inline-block;
  width: 45px;
  height: 45px;
  line-height: 45px;
  font-size: 45px;
  width: 100%;
`;

export const SelectButton = styled(ControlWrapper)`
  width: 100%;
  margin-top: 5px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  transition: all 200ms ease-in;
  cursor: pointer;
  
  :hover img {
    transform: scale(${props => props.isNotImage ? 0.85 : 1.1});
  }
  
  :hover ${ControlWrapper} {
    display: block;
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

export const Overlay = styled.div`
  display: ${p => p.checked ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  padding: 5px 10px;
  z-index: 46;
  
  ${ImageWrapper}:hover & {
    display: flex;
  }
`;

export const ControlsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Controls = styled('div')`
  display: flex;
  justify-content: center;
`;

export const Img = styled.img`
  width: 100%;
  vertical-align: middle;
  height: ${props => props.height}px;
  opacity: 1;
  transition: all 0.3s;
  transform: scale(${props => props.isNotImage ? 0.75 : 1});
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
  overflow: hidden;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
`;

export const ImagesListContainer = styled.div`
  padding: 0 10px;
  height: calc(100% - 119px);
  position: relative;
  
  > div {
    height: 100%;
    
    > div {
      height: 100% !important;
    }
  }
`;

export const AddColorBtn = styled.div`
  display: inline-block;
  //padding: 6px 12px;
  //border: 1px solid #ccc;
  margin: 5px 4px;
  //border-radius: 4px;
  //color: #70777f;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  //width: calc(100% - 32px);
  //text-align: center;
  color: ${p => p.theme.buttonBackground || '#00707b'};
  
  :hover {
    //border: 1px solid #7f7f7f;
    color: ${p => p.theme.hoverButtonBackground || '#00505b'};
  }
    
  ${props => props.hide && `display: none;`}
`;

export const SketchPickerWrapper = styled.div`
  position: absolute;
  z-index: 5;
  left: 180px;
  top: 10px;
  background: #fff;
  padding: 5px;
  border-radius: 4px;
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
  padding-right: 18px;
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
      style={{ top: 4, right: 1, color: '#747981', zIndex: 4, fontSize: 16 }}
    />
  </ColorFilterItemWrapper>
);

export const ShowMoreResultsSpinnerWrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px !important;
  
  > div:first-child {
    opacity: 0.6;
  }
  
  > div:last-child {
    height: 1em !important;
  }
`;

export const ApplyColorBtn = styled(Button)`
  margin-top: 5px;
  width: 100%;
  font-weight: 400;
  text-transform: none;
`;

export const ShowMoreResultsSpinner = ({ show }) => show ? (
  <ShowMoreResultsSpinnerWrapper show={show}>
    <Spinner overlay show={show} style={{ fontSize: 10 }}/>
  </ShowMoreResultsSpinnerWrapper>
) : null;

export const ImageDescription = styled.div`
  box-sizing: border-box;
  background: ${p => p.theme.activeSidebarItemBackground || 'gainsboro'};
  z-index: 45;
  position: relative;
  height: 20px;
  
  * {
    box-sizing: border-box;
  }
`;

export const ImageName = styled.div`
  height: 20px; 
  font-size: 12px;
  font-weight: 300;
  display: block;
  vertical-align: middle;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 25px;
  text-align: center;
  color: ${p => p.theme.text};
`;

export const EditButton = styled(ButtonSearch)`
  background-color: ${p => p.success ? '#28a745' : p.theme.buttonBackground};
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0;
  
  :hover {
    background-color: ${p => p.success ? '#208638' : p.theme.hoverButtonBackground};
  }
`;

export const CheckBoxWrapper = styled('div')`
  min-height: 15px;
`;

export const Checkbox = styled('input').attrs((p) => ({
  type: p.type ? p.type : 'checkbox'
}))`
  align-self: flex-end;
  appearance: none;
  position: absolute;
  top: 10px;
  right: 11px;
  height: ${p => p.type === 'radio' ? '11px' : '15px' };
  width: ${p => p.type === 'radio' ? '11px' : '15px' };
  transition: all 0.15s ease-out 0s;
  border-style: solid;
  border-width: 1px;
  border-color: #fff;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 5px;
  outline: none;
  border-radius: ${p => p.type === 'radio' ? '50%' : '2px' };
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  z-index: 50;
  
  :hover::before {
    border-radius: 50%;
    height: ${p => p.type === 'radio' ? '3px' : '15px' };
    width: ${p => p.type === 'radio' ? '3px' : '15px' };
    top: ${p => p.type === 'radio' ? '4px' : '' };
    left: ${p => p.type === 'radio' ? '4px' : '-2px' };
    content: ${p => p.type === 'radio' ? "''" : "'\\e90c'" };
    position: absolute;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    font-family: 'filerobot-uploader-font';
  }
  
  :checked::before {
    border-radius: 50%;
    height: ${p => p.type === 'radio' ? '3px' : '15px' };
    width: ${p => p.type === 'radio' ? '3px' : '15px' };
    top: ${p => p.type === 'radio' ? '4px' : '' };
    left: ${p => p.type === 'radio' ? '4px' : '-2px' };
    content: ${p => p.type === 'radio' ? "''" : "'\\e90c'" };
    position: absolute;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    font-family: 'filerobot-uploader-font';
  }
  
  :checked::after {
    -webkit-animation: click-wave 0.65s;
    -moz-animation: click-wave 0.65s;
    animation: click-wave 0.65s;
    content: '';
    display: block;
    position: relative;
    z-index: 100;
  }
  
  :focus {
    outline: none !important;
  }
`;