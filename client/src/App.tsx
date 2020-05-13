import React from "react";
import styled from "styled-components";
import "./App.css";
import { ThemeContextProvider } from "./Components/ThemeContextProvider/ThemeContextProvider";
import { GlobalStyles } from "./global.styled";
import Grid from "./Components/Grid/Grid";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <>
          <GlobalStyles />
          <Grid />
        </>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
