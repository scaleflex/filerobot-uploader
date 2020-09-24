import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Dialog, Content, Header, Body, Footer, Title, CloseButton, Button, CancelButton } from './confirm-popup.styled';


const ConfirmPopup = (props) => {
  const { onClickAccept, onClickCancel, accept, cancel, title, msg } = props;

  const onClickOverlay = (event) => {
    if (event.target.className.includes('dialog')) onClickCancel();
  };

  return (
    <Overlay onClick={onClickOverlay}>
      <Dialog className="dialog">
        <Content>
          <Header>
            <Title>{title}</Title>
            <CloseButton type="button" onClick={onClickCancel}>
              <span>&times;</span>
            </CloseButton>
          </Header>
          <Body>
            <p>{msg}</p>
          </Body>
          <Footer>
            <Button type="button" onClick={onClickAccept}>{accept}</Button>
            <CancelButton type="button" onClick={onClickCancel}>{cancel}</CancelButton>
          </Footer>
        </Content>
      </Dialog>
    </Overlay>
  );
};

ConfirmPopup.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onClickAccept: PropTypes.func.isRequired,
  accept: PropTypes.string,
  cancel: PropTypes.string,
  title: PropTypes.string,
  msg: PropTypes.string,
};

export default ConfirmPopup;
