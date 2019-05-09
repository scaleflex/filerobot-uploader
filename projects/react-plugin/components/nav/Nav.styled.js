import styled from 'styled-components';


export const Tab = styled.a`
  font-family: Roboto, sans-serif;
  color: ${props => props.selected ? props.theme.activeTabTextColor : props.theme.tabTextColor};
  background-color: ${props => props.selected ? props.theme.activeTabBackground : 'transparent'};
  text-decoration: none;
  font-size: 12px;
  line-height: 21px;
  padding: 9px 12px;
  cursor: pointer;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  font-weight: 400;
  display: inline-block;
  vertical-align: top;

  // :first-child {
  //   margin-left: 5px;
  // }

  :hover {
    color: ${props => props.selected ? props.theme.activeTabTextColor : props.theme.tabTextColor};
    background-color: ${props => props.theme.activeTabBackground || 'transparent'};
  }

  i {
    font-size: 21px;
    line-height: 21px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    
    @media screen and (max-width: 850px) {
      display: none;
    }
  }
`;