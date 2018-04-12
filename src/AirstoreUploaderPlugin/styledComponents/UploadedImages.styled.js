import React from 'react';
import styled from 'styled-components';

export const UploadedImages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavItem = styled.span`
  color: #70777f;
  font-size: 14px;
  padding-right: 25px;
  cursor: pointer;
  
  :active {
    text-decoration: underline;
    color: #1e262c;
  }
`;

export const Content = styled.div`
  
`;

export const UploadBoxWrapper = styled.div`

`;

export const UploadBox = styled.div`
  width: 200px;
  height: 160px;
  border: 2px dashed #d8d8d8;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #5D636B;
  box-sizing: border-box;
`;

export const UploadBoxIcon = styled.span`
  font-size: 80px;
`;