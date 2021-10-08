import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import styled, { createGlobalStyle } from "styled-components";

const Root = styled.div``;

const GlobalStyle = createGlobalStyle`
  body {
    font-family:  "Ubuntu", sans-serif;
    background: black;
    color: white;
  }

  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <Root>
    <GlobalStyle />
    <App />
  </Root>,
  document.getElementById("root")
);
