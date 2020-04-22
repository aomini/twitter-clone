import React from "react";
import styled from 'styled-components'
import "./App.css";
import Grid from "./Components/Grid/Grid";
import { ThemeContextProvider } from "./Components/ThemeContextProvider/ThemeContextProvider";
import {GlobalStyles} from "./global.styled"

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <>
          <GlobalStyles/>
          <Grid />
        </>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
