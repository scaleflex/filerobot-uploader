import React, { Fragment } from 'react';
import styled from 'styled-components';


function BreadCrumbs({ path }) {

  return (
    <Wrapper>
      <span>Root</span> {
      (path || '').split('/')
        .filter(item => item)
        .map((item, index) => <Fragment key={index}><span>/</span><span>{item}</span></Fragment>)
    }
    </Wrapper>
  )
}


const Wrapper = styled('div')`
  display: inline-block;
  vertical-align: middle;
  color: ${p => p.theme.text};
  margin-left: 10px;
  
  span {
    margin: 0 2px;
    opacity: 0.7;
    
    :last-child {
      opacity: 1;
      font-weight: bold;
    }
  }
`;


export default BreadCrumbs;