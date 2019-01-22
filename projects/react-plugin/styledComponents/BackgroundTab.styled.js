import React from 'react';
import styled from 'styled-components';
import { CloseBtn } from '../components/CloseBtn';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';

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

export const ColorItem = styled.div.attrs({ className: props => props.active ? 'ae-color-item' : '' })`
  position: relative;
  padding: 10px 5px;
  border-left: ${props => props.active ? '6px solid #00707c' : '6px solid transparent'};
  font-size: 12px;
  color: #1e262c;
  text-transform: capitalize;
  display: flex;
  cursor: pointer;
  background: ${props => props.active ? '#fff' : 'transparent'};
  
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

export const EditIconWrapper = styled.div`
  display: none;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  padding: 4px;
  z-index: 50;
  
  :hover {
    background: #d1d1d8;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  transition: all 200ms ease-in;
  cursor: pointer;
  
  :hover img {
    transform: scale(1.1);
  }
  
  :hover ${EditIconWrapper} {
    display: inline-block;
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

export const Img = styled.img`
  width: 100%;
  vertical-align: middle;
  height: ${props => props.height}px;
  opacity: 1;
  transition: all 0.3s;
  background: rgba(155, 155, 155, .15);
  -moz-transform: scale(1);
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
  color: #00707b;
  
  :hover {
    //border: 1px solid #7f7f7f;
    color: #00505b;
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
  background: gainsboro;
  z-index: 50;
  position: relative;
  
  * {
    box-sizing: border-box;
  }
`;

export const ImageName = styled.div`
  height: 20px; 
  font-size: 12px;
  font-weight: 300;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
  width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px 0 25px;
  text-align: center;
`;

export const EditIcon = styled.i`
  display: inline-block;
  vertical-align: top;
  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUyOC44OTlweCIgaGVpZ2h0PSI1MjguODk5cHgiIHZpZXdCb3g9IjAgMCA1MjguODk5IDUyOC44OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUyOC44OTkgNTI4Ljg5OTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTMyOC44ODMsODkuMTI1bDEwNy41OSwxMDcuNTg5bC0yNzIuMzQsMjcyLjM0TDU2LjYwNCwzNjEuNDY1TDMyOC44ODMsODkuMTI1eiBNNTE4LjExMyw2My4xNzdsLTQ3Ljk4MS00Ny45ODENCgkJYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExDQoJCUM1MzIuNDk1LDEwMC43NTMsNTMyLjQ5NSw3Ny41NTksNTE4LjExMyw2My4xNzd6IE0wLjMsNTEyLjY5Yy0xLjk1OCw4LjgxMiw1Ljk5OCwxNi43MDgsMTQuODExLDE0LjU2NWwxMTkuODkxLTI5LjA2OQ0KCQlMMjcuNDczLDM5MC41OTdMMC4zLDUxMi42OXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K') 50% 50% / cover no-repeat;
  width: 12px;
  height: 12px;
`;