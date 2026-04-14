import { ReactElement } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Posts } from "./pages/Posts";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    background: #e8d5f5;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(152, 251, 152, 0.15) 0%, transparent 60%);
    color: #3b2063;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    image-rendering: pixelated;
  }

  h1, h2, h3 {
    font-family: 'Press Start 2P', cursive;
  }

  button {
    font-family: 'Press Start 2P', cursive;
  }
`;

export const App = (): ReactElement => (
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <Posts />
    </ErrorBoundary>
  </>
);
