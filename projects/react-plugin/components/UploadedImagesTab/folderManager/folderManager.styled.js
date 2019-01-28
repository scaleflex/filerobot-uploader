import styled from 'styled-components';
import { CloseBtn } from '../../CloseBtn';


export const FolderTitle = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: #5D636B;
  margin-left: 10px;
  font-size: 14px;
`;

export const FolderIcon = styled.div`
  width: ${props => props.small ? '14px' : '17px'};
  height: ${props => props.small ? '10px' : '12px'};
  margin: 0 auto;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: ${props => props.small ? '#00707C' : ' #708090'};
  border-radius: ${props => props.small ? '0 1px 1px 1px' : '0 2px 2px 2px'};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.39);
  margin-right: ${props => props.mr ? props.mr : 'auto'};
  
  :before {
    content: '';
    width: 50%;
    height: ${props => props.small ? '2px' : '3px'};
    border-radius: ${props => props.small ? '0 1px 0 0' : '0 2px 0 0'};
    background-color: ${props => props.small ? '#00707C' : ' #708090'};
    position: absolute;
    top: ${props => props.small ? '-2px' : '-3px'};
    left: 0px;
  }
`;

export const FolderToggleWrapper = styled.div`
  cursor: pointer;
  
  :hover ${FolderIcon} {
    background-color: #00707C;
    
    :before {
      background-color: #00707C;
    }
  }
  
  :hover ${FolderTitle} {
    color: #00707C;
  }
`;

export const FolderManagerWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  color: #5D636B;
  margin-left: ${props => props.showFileManager ? '0px' : '-200px'};
  //visibility: ${props => props.showFileManager ? 'visible' : 'hidden'};;
  width: 200px;
  background: rgb(245, 245, 245);
  border-right: 1px solid rgb(221,221,221);
  z-index: 1045;
  transition: 0.3s margin;
  overflow: hidden;
  overflow-y: auto;
`;

export const ManagerHeader = styled.div`
  height: 50px;
  color: #5D636B;
  padding: 0 10px;
  white-space: nowrap;
  border-bottom: 1px solid rgb(221,221,221);
`;

export const ManagerHeaderTitle = styled.div`
  line-height: 50px;
  font-size: 14px;
`;

export const CloseManagerBtn = styled(CloseBtn)`
  font-size: 18px;
  top: 16px;
  
  :hover {
    color: #7b8189;
  }
`;

export const Folder = styled.div`
  position: relative;
  padding: 5px 20px 5px 10px;
  cursor: pointer;
  font-size: 14px;
  
  :hover {
    background: rgba(0, 0, 0, 0.1);
    
    .remove-icon-folder {
      display: inline-block !important;
    }
    
    .settings-icon-folder {
      display: inline-block !important;
    }
  }
`;

Folder.Icon = styled.div.attrs({ className: 'ai-icon-folder' })`
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin: 0 5px 0 0;
  color: #31b0d5;
`;

Folder.Name = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${props => props.isSelect ? 'calc(100% - 40px)' : 'calc(100% - 25px)'};
`;

Folder.EditName = styled.input`
  display: inline-block;
  vertical-align: middle;
  line-height: 1 !important;
  width: ${props => props.isSelect ? 'calc(100% - 55px)' : 'calc(100% - 30px)'} !important;
`;

export const Overlay = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 199;
`;
