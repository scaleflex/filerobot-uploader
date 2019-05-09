import styled from 'styled-components';
import { ButtonSearch, InputSearch } from '../../styledComponents';


export const Container = styled.div`
  width: 100%;
  min-height: 240px;
  height: 100%;
  text-align: center;
  border: ${p => p.noBorder ? 'none' : `2px dashed ${p.theme.border}`};
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

export const ItemName = styled.div`
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
    color: ${p => p.theme.text === '#fff' || p.theme.text === '#ffffff' ? '#000' : '#fff'};
  }

  :focus {
    outline-color: ${p => p.theme.text || 'rgb(77, 144, 254)'};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;

export const PreviewFiles = styled.div`
  width: calc(100% - 350px);
  display: flex;
  vertical-align: middle;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
`;

export const PreviewFileWrapper = styled.div`
  width: ${p => p.oneImage ? '100%' : 'calc(50% - 20px)'};
  padding: 10px 10px 25px 10px;
  margin: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  position: relative;
  height: ${p => p.h ? parseInt(p.h, 10) * (p.oneImage ? 2 : 1) : 285 * (p.oneImage ? 2 : 1)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img, canvas {
    width: auto !important;
    max-height: ${p => p.h ? (parseInt(p.h, 10) * (p.oneImage ? 2 : 1) - 35 ) : 250 * (p.oneImage ? 2 : 1) }px !important;
    max-width: 100% !important;
  }
  
  div {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 25px;
    bottom: 0;
    left: 0;
  }
`;

export const PreviewLabel = styled.label`
  display: inline-block;
  width: 100px;
  text-align: left;
  margin-bottom: 10px;
`;

export const ButtonAction = styled(ButtonSearch)`
  display: inline-block;
  margin: auto;
  margin-top: 20px;
  font-size: 16px;
  padding: 10px;
  height: auto;
  border-radius: 4px;
  line-height: 1.42857;
  border: 1px solid transparent;
  width: 145px;
`;

export const ButtonApplyTransforms = styled(BrowseButton)`
  display: inline-block;
  margin: auto;
  margin-top: 20px;
  font-size: 16px;
  padding: 10px;
  height: auto;
  border-radius: 4px;
  width: 145px;
`;

export const TransformationList = styled.div`
  position: relative;
  width: 200px;
  display: inline-block;
  text-align: left;
  margin-bottom: 10px;
  
  .options {
    position: absolute;
    width: 100%;
    display: none;
    background: #ffffff;
    border-radius:  0 0 4px 4px;
    overflow: hidden;
    box-shadow: rgba(0,0,0,0.15) 0 2px 7px;
    
    &.active {
      display: block;
    }
  }
  
  .item {
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    padding: 4px 8px;
    
    :hover, &.active {
      color: #fff;
      background: #00707C;
    }
    
    :hover.disabled, &.disabled {
      background: #C9C9C9;
      color: #5D5D5D;
      cursor: wait;
    }
  }
`;

export const ActiveOperation = styled(InputSearch)`
  position: relative;
  width: 100%;
  border-radius: 4px;
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  cursor: pointer;

  &:focus {
    background-image:
      linear-gradient(45deg, green 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, green 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position:
      calc(100% - 15px) 1em,
      calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;
    border-color: green;
    outline: 0;
  }
  
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  
  &.active {
    border-radius: 4px 4px 0 0 !important;
  }
`;

export const OperationInput = styled(InputSearch)`
  width: 200px;
  display: inline-block;
  margin-bottom: 10px;
`;