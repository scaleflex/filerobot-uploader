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
  display: ${props => props.active ? 'block' : 'none'};
`;

export const TabWrap = styled.div`
  display: flex;
  height: 100%;
`;