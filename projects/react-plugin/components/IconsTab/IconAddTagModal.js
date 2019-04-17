import React, { Component } from 'react';
import { Aux } from '../hoc';
import { addTag } from '../../services/iconsApi.service';
import {
  ButtonSearch, Label, MonoIconSettings, Opacity, Input, IconAddTagInner
} from '../../styledComponents';
import { I18n } from 'react-i18nify';


class IconAddTagModal extends Component {
  state = { tagName: '' };

  componentDidMount() {
    setTimeout(() => {
      if (this._input && this._input.focus) this._input.focus();
    })
  }

  onAddTag = () => {
    const { activeIcon, onClose, showAlert } = this.props;
    const { tagName } = this.state;

    addTag(activeIcon.uid, tagName).then(() => {
      showAlert(I18n.t('icons.new_tag_successfully_added'));
      onClose();
    })
  }

  render() {
    const { onClose } = this.props;
    const { tagName } = this.state;

    return (
      <Aux>
        <Opacity isShow={true} onClick={onClose}/>

        <MonoIconSettings isShow={true}>
          <IconAddTagInner>
            <Label color={'black'} nb>Would you like to add tag?</Label>
            <Input
              ref={node => this._input = node}
              defaultValue={tagName}
              onKeyDown={event => { event.keyCode === 13 && this.onAddTag(); }}
              onChange={({ target }) => { this.setState({ tagName: target.value }) } }
            />
            <ButtonSearch fullBr={'4px'} onClick={this.onAddTag}>Add tag</ButtonSearch>
          </IconAddTagInner>
        </MonoIconSettings>
      </Aux>
    )
  }
}


export default IconAddTagModal;