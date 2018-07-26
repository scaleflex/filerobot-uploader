import React, { Component } from 'react';
import { Aux } from '../hoc';
import {
  ButtonSearch, Label, MonoIconSettings, ColorIcon, ColorsWrapper, Opacity, SettingsIcon, SettingsIconWrapper,
  MonoActionBlock, ThemeColors
} from '../../styledComponents';
import { COLORS } from '../../config';
import { guid } from '../../services/helper.service';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import { SketchPicker } from 'react-color';


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

  handleChange = (color) => {
    this.setState({ activeColor: color.hex,  isLoading: true });
  };

  onOutsideClick = () => {
    this.setState({ displayColorPicker: false });
    this.props.onClose();
  }

  render() {
    const { themeColors } = this.props;
    const { isLoading, displayColorPicker, activeColor } = this.state;
    const popover = {
      position: 'absolute',
      zIndex: '4',
      top: 0,
      right: -230
    }

    return (
      <Aux>
        <Opacity isShow={true} onClick={() => { this.onOutsideClick(); }}/>

        <MonoIconSettings isShow={true} displayColorPicker={displayColorPicker}>
          <SettingsIconWrapper>
            <SettingsIcon src={this.getIconUrl(140)} onLoad={this.onLoad}/>
            <Spinner overlay show={isLoading} style={{ fontSize: 10 }}/>
          </SettingsIconWrapper>
          <MonoActionBlock>
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
            <ThemeColors>
              <Label color={'black'} mr={'5px'} p={'0px'}>Theme colors:</Label>
              <ColorIcon onClick={() => { this.setColor(themeColors.primary); }} bgColor={themeColors.primary}/>
              <ColorIcon onClick={() => { this.setColor(themeColors.secondary); }} bgColor={themeColors.secondary}/>
            </ThemeColors>
            <ButtonSearch fullBr={'4px'} onClick={this.onApply}>Apply</ButtonSearch>
          </MonoActionBlock>
          {displayColorPicker ? <div style={popover}>
            <SketchPicker color={activeColor} onChange={this.handleChange}/>
          </div> : null}
        </MonoIconSettings>

      </Aux>
    )
  }
}


export default IconMonoColorSettings;