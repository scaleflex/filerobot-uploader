import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from '../components/CloseBtn';
import { ButtonSearch } from './IconTab.styled';


export const UploadedImages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  height: 100%;
  box-sizing: border-box;
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  min-height: 50px;
`;

export const Nav = styled.nav`
  display: block;
`;

export const NavItem = styled.span`
  color: ${props => props.active ? '#1e262c' : '#70777f'};
  font-size: 14px;
  padding-right: 25px;
  cursor: pointer;
  text-decoration: ${props => props.active ? 'underline' : 'none'};
`;

export const UploadBoxWrapper = styled.div`
  display: inline-block;
  width: ${props => props.columnWidth || 300}px !important;
  height: ${props => props.height || 200}px !important;;
`;

export const UploadBox = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #d8d8d8;
  background: ${props => props.isDragOver ? 'rgba(210, 253, 207, 0.5)' : '#f5f5f5'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #5D636B;
  box-sizing: border-box;
`;

export const Content = styled.div`
  color: #5D636B;
  height: 100%;
  
  ${UploadBox} {
    background: ${props => props.isDragOver ? 'rgba(210, 253, 207, 0.5) !important' : props.theme.activeSidebarItemBackground};
    border:  ${props => props.isDragOver ? '2px dashed #888888' : `2px dashed ${props.theme.border}`};
  }
`;

export const UploadBoxIcon = styled.span`
  font-size: 80px;
`;

export const UploadInputBox = styled.input`
  width: .1px;
  height: .1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const ButtonClose = styled(CloseBtn)`
  left: 280px;
  width: 20px;
  top: 8px;
  
  :hover {
    color: ${p => p.theme.buttonBackground || '#00707C'};
  }
`;

export const ActionButtonsWrapper = styled('div')`
  display: flex;
  
`;

export const SortButton = styled(ButtonSearch)`
  border-radius: 4px;
  margin-right: 5px;
  
  .options-dropdown-menu {
    position: absolute;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    background: ${p => p.theme.mainBackground};
    padding: 0;
    margin: 0;
    list-style-type: none;
    border-radius: 3px;

    button,
    a {
      padding: 4px 8px;
      cursor: pointer;
      margin: 0;
      width: 100%;
      border: none;
      outline: none;
      color: ${p => p.theme.text};
      background-color: ${p => p.theme.mainBackground};
      text-align: left;
      font-size: 12px;

      &:hover:not([disabled]) {
        background: #d7d7d7;
      }
    }

    a {
      display: block;
      color: ${p => p.theme.text};
      text-decoration: none;
    }
  }
  
  [class^="ai-icon-"],
    .sort-tick-wrapper {
      margin-right: 5px;
    }
    
    .sort-tick {
    display: inline-block;
    background: transparent no-repeat;
    background-size: cover;
    width: 7px;
    height: 7px;
    border: none;

    &.icon-up {
      background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-arrow-up.svg");

      &.white {
        background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-arrow-up-white.svg");
      }

      &.dark {
        background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-arrow-up-dark.svg");
      }
    }

    &.icon-down {
      background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-down.svg");

      &.white {
        background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-down-white.svg");
      }

      &.dark {
        background-image: url("//js.filerobot.com/airstore-explorer/static/media/caret-down-dark.svg");
      }
    }
  }
`;