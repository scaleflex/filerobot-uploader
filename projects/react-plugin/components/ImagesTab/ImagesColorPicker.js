import React from 'react';
import { I18n } from 'react-i18nify';
import { SketchPicker } from 'react-color';
import { SketchPickerWrapper, SketchPickerOverlay, ApplyColorBtn } from '../../styledComponents';


export default ({ colorFilter, handleClose, handleChange }) => {

  return (
    <SketchPickerWrapper>
      <SketchPickerOverlay onClick={handleClose}/>
      <SketchPicker color={colorFilter.value} onChange={handleChange}/>
      <ApplyColorBtn
        sm
        themeColor
        onClick={handleClose}
        style={{ zIndex: 5555, position: 'relative' }}
      >{I18n.t('upload.apply')}</ApplyColorBtn>
    </SketchPickerWrapper>
  )
}