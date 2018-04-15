import React, {Component} from 'react';
import { UploadedImages, HeaderWrap, Nav, NavItem, ButtonSearch, Content, UploadBoxWrapper, UploadBox, Label,
  UploadBoxIcon } from '../../styledComponents/index';


class UploadedImagesTab extends Component {
  render() {
    return(
      <UploadedImages>
        <HeaderWrap>
          <Nav>
            <NavItem>All</NavItem>
            <NavItem>Company</NavItem>
            <NavItem>Project</NavItem>
          </Nav>

          <ButtonSearch fullBr={'4px'}>Upload images</ButtonSearch>
        </HeaderWrap>

        <Content>
          <UploadBoxWrapper>
            <UploadBox>
              <UploadBoxIcon className={'sfi-airstore-image'}/>
              <Label>Upload image</Label>
            </UploadBox>
          </UploadBoxWrapper>
        </Content>
      </UploadedImages>
    )
  }
}

export default UploadedImagesTab;