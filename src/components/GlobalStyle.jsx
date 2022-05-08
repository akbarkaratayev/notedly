import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css';

export default createGlobalStyle`
  ${normalize}
  *,*::before, *::after {
    box-sizing: border-box;
  }
  body,
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fff;
    line-height: 1.4;
  }

  a:link,
  a:visited {
    color: #07c;
  }
  a:hover,
  a:focus  {
    color: #049;
  }
  code,
  pre {
    max-width: 100%;
  }
`