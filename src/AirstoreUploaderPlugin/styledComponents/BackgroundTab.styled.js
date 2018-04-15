import React from 'react';
import styled from 'styled-components';

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