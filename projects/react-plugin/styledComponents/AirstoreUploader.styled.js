import styled from 'styled-components';


export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  fontFamily: Roboto, sans-serif;
  background: #181830;
            
  ::-webkit-scrollbar {
    height: 6px !important;
    width: 6px !important;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgb(221,221,221);
    border-radius: 5px;
  }
  
  input[type="search"] {
    box-sizing: border-box !important;
  }
  
  * {
      box-sizing: border-box;
  }
`;