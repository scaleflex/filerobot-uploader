import React, { Component } from 'react';
import { Aux } from '../hoc';
import {
  ButtonSearch, Label, MonoIconSettings, ColorIcon, ColorsWrapper, Opacity, SettingsIcon, SettingsIconWrapper
} from '../../styledComponents';
import { COLORS } from '../../config';
import { guid } from '../../services/helper.service';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { ChromePicker } from 'react-color';


class IconMonoColorSettings extends Component {
  state = {
    activeColor: '#000000',
    isLoading: true,
    displayColorPicker: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.activeColor !== this.state.activeColor ||
      nextState.isLoading !== this.state.isLoading ||
      nextState.displayColorPicker !== this.state.displayColorPicker
    );
  }

  setColor = (color) => {
    this.setState({ activeColor: color, isLoading: true });
  }

  onApply = () => {
    const { upload } = this.props;
    const width = 300;

    upload({ src: this.getIconUrl(width) });
  }

  getIconUrl = (width) => {
    const { activeColor } = this.state;
    const { activeIconSrc } = this.props;
    const colorQuery = `tpng.transparentwhite.level${activeColor.replace('#', '')}`;

    return `//scaleflex.cloudimg.io/width/${width}/${colorQuery}/${activeIconSrc}&v=${guid()}`;
  }

  onLoad = () => {
    this.setState({ isLoading: false });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ activeColor: color.hex,  isLoading: true });
  };

  render() {
    const { isLoading, displayColorPicker, activeColor } = this.state;
    const { onClose } = this.props;
    const popover = {
      position: 'absolute',
      zIndex: '4',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (
      <Aux>
        <Opacity isShow={true} onClick={onClose}/>

        <MonoIconSettings isShow={true}>
          <SettingsIconWrapper>
            <SettingsIcon src={this.getIconUrl(140)} onLoad={this.onLoad}/>
            <Spinner overlay show={isLoading} style={{ fontSize: 10 }}/>
          </SettingsIconWrapper>
          <Label color={'black'}>Customize your icon</Label>
          <ColorsWrapper>
            {COLORS.map((color, index) => (
              <ColorIcon onClick={() => { this.setColor(color); }} bgColor={color} key={`color-${index}`}/>
            ))}
            <ColorIcon
              onClick={this.handleClick}
              bgColor="transparent"
              bgImage={'//example.api.airstore.io/v1/get/a842b7b1-ae10-5e27-8838-fbc7796305fb'}
            />
          </ColorsWrapper>
          <ButtonSearch fullBr={'4px'} onClick={this.onApply}>Apply</ButtonSearch>
        </MonoIconSettings>

        {displayColorPicker ? <div style={popover}>
          <div style={cover} onClick={this.handleClose}/>
          <ChromePicker color={activeColor} onChange={this.handleChange}/>
        </div> : null}
      </Aux>
    )
  }
}


export default IconMonoColorSettings;