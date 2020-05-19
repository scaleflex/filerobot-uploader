import React from 'react';
import { Img, ImageWrapper } from '../../styledComponents';
import * as ImageGridService from '../../services/imageGrid.service';


export default ({ props: { style, columnWidth, item, index }, upload, onKeyDown, cloudimageToken}) => (
  <ImageWrapper
    style={{ ...style, width: Math.floor(columnWidth) }}
    onClick={() => { upload(item); }}
    tabIndex={index}
    onKeyDown={(event) => { onKeyDown(event, item); }}
  >
    <Img
      height={Math.floor(columnWidth / (item.ratio || 1.6))}
      src={ImageGridService.getCropImageUrl(item.src, columnWidth, Math.floor(columnWidth / (item.ratio || 1.6)), cloudimageToken)}
    />
  </ImageWrapper>
)