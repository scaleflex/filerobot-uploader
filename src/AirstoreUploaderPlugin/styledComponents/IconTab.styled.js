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
  cursor: pointer;
  font-weight: 300;
  outline: 0;
  font-size: 12px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;

  :hover {
    background-color: #6D737B;
  }

  :focus {
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;

export const SearchWrapper = styled.div`
  justify-content: left;
  
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
  padding-bottom: 8px;
  padding: 10px;
  
  ::-webkit-scrollbar {
    height: 10px !important;
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
`;

export const ColorType = styled.div`
  margin-bottom: 15;
  margin-top: 15;
`;

export const ColorItem = styled.div`
  position: relative
  padding: 10px 5px;
  // border-left: ${props => props.active ? '3px solid #00707c' : 'none'};
  font-size: 12px;
  color: #1e262c;
  background: ${props => props.active ? '#fff' : 'none'};;
  text-transform: capitalize;
  display: flex;
  cursor: pointer;
`;

export const ColorItemName = styled.span`
  margin-left: 5px;
`;

export const ActiveItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: #00707c;
`;