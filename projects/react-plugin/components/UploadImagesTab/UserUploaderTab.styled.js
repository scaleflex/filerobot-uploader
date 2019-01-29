import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 240px;
  height: 100%;
  text-align: center;
  border: 2px dashed ${p => p.theme.border};
  background: ${p => p.isDragOver ? 'rgba(210, 253, 207, 0.5)' : p.theme.mainBackground};
  align-items: center;
  justify-content: center;
  display: flex;
  color: #5D636B;
  box-sizing: border-box;
`;

export const Nav = styled.nav`
  line-height: 1;
  height: 100%;
  display: flex;
  background-color: ${p => p.theme.navBackground};
`;

export const ItemName = styled.span`
  padding: 10px;
  padding-top: ${p => p.pt ? p.pt : 10}px;
  padding-bottom: ${p => p.pb ? p.pb : 10}px;
  font-weight: 200;
  font-size: 12px;
  color: ${p => p.theme.text};
`;

export const BrowseButton = styled.button`
  height: 34px;
  padding: 6px 12px;
  line-height: 1.42857;
  color: ${p => p.theme.text || '#5D636B'};
  background-color: transparent;
  background-repeat: repeat-x;
  text-shadow: rgb(255, 255, 255) 0px 1px;
  border-width: 1px;
  border-style: solid;
  border-color: ${p => p.theme.text || 'solid'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  outline: 0;
  font-size: 12px;
  margin: auto;

  :hover {
    background-color: ${p => p.theme.text || '#6D737B'};
    color: #fff;
  }

  :focus {
    outline-color: ${p => p.theme.text || 'rgb(77, 144, 254)'};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;