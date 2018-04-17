import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import {ModalCss as styles} from '../assets/styles';


class Modal extends Component {
  initModal = () => {
    const { width = null, height = null } = this.props;
    const modal = ReactDOM.findDOMNode(this.refs.modal);
    const customStyles = { width, height };

    if (!modal) return;

    for (let prop in customStyles)
      if (prop !== null) modal.style.setProperty(prop, customStyles[prop], 'important');

    document.body.classList.add('modal-open');
  };

  close = ({ target }) => {
    const container = ReactDOM.findDOMNode(this.refs.container);
    const removeBtn = ReactDOM.findDOMNode(this.refs.removeBtn);
    const { onClose } = this.props;

    if (target !== container && target !== removeBtn) return;

    if (onClose) onClose();
  };

  componentDidMount() {
    this.initModal();
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open');
  }

  render() {
    const { StyleRoot } = Radium;
    const { content, style = {} } = this.props;

    return (
      <StyleRoot
        ref="container"
        style={[styles.container, { display: 'block', opacity: 1 }, style]}
        onClick={this.close}
      >
        <StyleRoot ref="modal" style={[styles.container.modal]}>
          <div style={[styles.container.modal.content]}>
            <div ref="removeBtn" style={[styles.container.modal.removeBtn]} onClick={this.close}>×</div>
            {content}
          </div>
        </StyleRoot>
      </StyleRoot>
    );
  }
}

export default Radium(Modal);