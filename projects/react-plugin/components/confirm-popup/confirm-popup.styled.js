import styled from 'styled-components';

export const Overlay = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0 , 0, 0, .3);
  color: ${p => p.theme.text};
`;

export const Dialog = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Content = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;
`;

export const Header = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
`;

export const Body = styled('div')`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`;

export const Footer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
`;

export const Title = styled('h5')`
  margin: 0;
  line-height: 1.5;
  color: ${p => p.theme.title};
`;

export const CloseButton = styled('button')`
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  cursor: pointer;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
  background-color: transparent;
  border: 0;
`;

export const Button = styled('button')`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  cursor: pointer;
  color: ${p => p.theme.buttonTextColor || '#fff'};
  background-color: ${p => p.theme.buttonBackground || '#00707C'};
  
  :not(:last-child) {
    margin-right: .25rem;
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${p => p.theme.buttonBackground || '#00707C'};
  border: 1px solid ${p => p.theme.buttonBackground || '#00707C'};
`;