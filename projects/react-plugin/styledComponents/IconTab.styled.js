import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from '../components/CloseBtn';
import { Button } from '../components/Button';


export const SearchGroup = styled.div`
  display: flex;
  padding: ${props => props.padding ? props.padding : '10px'};
  justify-content: left;
  position: relative;
`;
export const AmountIcons = styled.div`
  display: ${props => props.empty ? 'none' : 'flex'};
  align-items: center;
  padding: 10px;
  font-size: 13px;
  color: #3f3f3f;
`;
export const Label = styled.div`
 text-align: ${props => props.center ? 'center' : 'left'};
  padding: ${props => props.p ? props.p : '10px 8px'};
  font-size: ${props => props.fs ? props.fs : 'inherit'};
  color: ${props => props.color === 'black' ? '#1e262c' : ''};
  border-top: ${ props => props.bt ? '1px solid rgb(221, 221, 221)' : 'none'};
  margin-right: ${props => props.mr ? props.mr : 0};
`;
export const InputSearch = styled.input.attrs({
  autoFocus: true
})`
  height: 34px;
  width: 300px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  color: rgb(85, 85, 85);
  background: rgb(255, 255, 255);
  border-radius: 4px 0 0 4px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border: 1px solid transparent;
  border-right: 0px solid transparent;
  outline: 0;

  :focus {
    border: 1px solid #5D636B;
    border-right: 0px solid transparent;
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;
export const ButtonSearch = styled.button`
  font-family: Roboto, sans-serif;
  height: 34px;
  padding: 6px 12px;
  line-height: 23px;
  text-transform: uppercase;
  color: #fff;
  background-color: #00707C;
  background-repeat: repeat-x;
  border: none;
  border-radius: ${props => props.fullBr ? props.fullBr : '0 4px 4px 0'};
  cursor: pointer;
  font-weight: 300;
  outline: 0;
  font-size: 12px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;
  font-weight: 400;
  text-transform: none;

  :hover {
    background-color: #096868;
  }

  :focus {
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  ${props => props.empty && `
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  `}
`;

export const SearchTitle = styled.h3`
  font-size: 25px;
  margin-top: -10%;
  font-weight: 200;
  display: none;
  color: rgb(93, 99, 107);
  
  ${props => props.show && `
    display: block;
  `}
`;

export const TagsWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  overflow-x: auto;
  margin: 10px;
  
  ::-webkit-scrollbar {
    height: 6px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: rgb(221,221,221);
    border-radius: 5px;
  }
`;

export const Tag = styled.div.attrs({ className: props => props.active ? 'ae-tag-active' : '' })`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #ccc;
  margin: 5px 2px;
  border-radius: 4px;
  color: #70777f;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  
  :first-child {
    margin-left: 0;
  }
  
  :last-child {
    margin-right: 0;
  }
  
  ${props => props.active && `
    background: #00707c;
    color: #fff;
    padding: 6px 21px 6px 9px;
  `}
  
  ${props => props.hide && `display: none;`}
`;

export const ColorWrapper = styled.div`
  padding-bottom: 10px;
`;

export const CloseIcon = styled(CloseBtn)`
  display: none;
  color: #fff;
  top: 50%;
  margin-top: -8px;
  right: 4px;
  font-size: 16px;
  
  ${props => props.active && `
    display: block;
  `}
`;

export const HoverWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${props => props.isShow ? 'flex' : 'none'};
  align-items: flex-end;
  justify-content: top;
  padding: 6px;
  cursor: pointer;
`;

export const AddTagBtn = styled(Button)`
  padding: 0 5px;
  font-size: 10px;
  margin-right: 2px;
`

export const ActionsIconWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 2;
  text-align: right;
`;

export const NotRelevantBtn = styled(Button)`
  padding: 0 5px;
  font-size: 10px;
`;

export const ControlIcon = styled.span`
  color: ${props => props.color ? props.color : '#f2f2f2'};
  font-size: ${props => props.fs ? props.fs : 25}px;
  cursor: pointer;
  padding-bottom: ${props => props.pb ? props.pb : ''}px;
`;

export const MonoIconSettings = styled.div`
  display: ${props => props.isShow ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: ${props => props.displayColorPicker ? 'calc(50% - 110px)' : '50%'};
  margin-top: -160px;
  margin-left: -140px;
  background-color: rgb(245, 245, 245);
  z-index: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const IconAddTagInner = styled.div`
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  width: 280px;
`;

export const Opacity = styled.div`
  display: ${props => props.isShow ? 'block': 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10,10,10,0.26) !important;
  //opacity: 0.25 !important;
  z-index: 1;
`;

export const ColorsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
  position: relative;
`;

export const ColorIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.bgColor ? props.bgColor : ''};
  background-image: ${props => props.bgImage ? 'url(' + props.bgImage + ')' : ''};
  background-size: cover;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
`;

export const SettingsIcon = styled.img`
  width: auto;
  height: 100%;
`;

export const SettingsIconWrapper = styled.div`
  width: 100%;
  height: 140px;
  position: relative;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const MonoActionBlock = styled.div`
  padding: 20px;
  background: rgb(242, 242, 242);
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0 0 4px 4px;
`;

export const IconsWrapper = styled.div`
  position: relative;
  //display: flex;
  //flex-wrap: wrap;
  //align-items: stretch;
  //justify-content: left;
  padding: 0 10px;
  height: calc(100% - 119px);
  
  > div {
    height: 100%;
    
    > div {
      height: 100% !important;
    }
  }
`;

export const IconTabWrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  font-family: Roboto, sans-serif;
`;

export const IconMain = styled.div`
  flex: 1;
  overflow: hidden;
  color: #5D636B;
  height: 100%;
  min-height: 100%;
`;

export const Input = styled(InputSearch)`
  height: 26px;
  margin-bottom: 20px;
  margin-top: 10px;
  width: 200px;
`;
export const IconBoxWrapper = styled.div`
  position: relative;
  background: #fff;
  boxSizing: border-box;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export const IconBoxWrapperInner = styled.div`
  position: relative;

  :focus {
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;
export const IconWrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
  padding: 20px;
  box-sizing: border-box;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 1);
  -moz-transform: scale(1);
  transition: all 200ms ease-in;
  
  ${props => props.isHover && `
    transform: scale(1.2);
  `}
`;

export const CountTag = styled.span`
  margin-left: 6px;
  color: rgb(112, 118, 126);
`;

export const ThemeColors = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`;