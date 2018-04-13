import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from 'scaleflex-react-ui-kit/dist';


export const IconImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
  opacity: 0.2;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 1);
  -moz-transform: scale(1);
  transition: all 200ms ease-in;
`;

export const SearchGroup = styled.div`
  display: flex;
  padding: 10px;
  justify-content: left;
`;
export const AmountIcons = styled.div`
  display: ${props => props.empty ? 'none' : 'flex'};
  align-items: center;
  padding: 10px;
  font-size: 13px;
`;
export const Label = styled.span`
  margin-right: 5px;
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
  line-height: 1.42857;
  text-transform: uppercase;
  color: #fff;
  background-color: #00707C;
  background-repeat: repeat-x;
  border: 1px solid #00707C;
  border-left: 0px solid transparent;
  border-radius: 0 4px 4px 0;
  border-radius: ${props => props.fullBr ? props.fullBr : '0 4px 4px 0'};
  cursor: pointer;
  font-weight: 300;
  outline: 0;
  font-size: 12px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;

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
  font-size: 24px;
  margin-top: -10%;
  font-weight: 200;
  display: none;
  
  ${props => props.show && `
    display: block;
  `}
`;

export const TagsWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  overflow-x: auto;
  padding: 10px 10px 0 10px;
  margin-bottom: 2px;
  
  ::-webkit-scrollbar {
    height: 6px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3b4d54;
    border-radius: 5px;
  }
`;

export const Tag = styled.div`
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

export const CloseIcon = CloseBtn.extend`
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
  background-color: #1e262c;
  opacity: .5;
  display: ${props => props.isShow ? 'flex' : 'none'};
  align-items: flex-end;
  justify-content: space-between;
  padding: 6px;
  cursor: pointer;
`;

export const ControlIcon = styled.span`
  color: ${props => props.color ? props.color : '#f2f2f2'};
  font-size: ${props => props.fs ? props.fs : 25}px;
  cursor: pointer;
`;

export const MonoIconSettings = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  height: 300px;
  background-color: #fff;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ColorIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: red
`;