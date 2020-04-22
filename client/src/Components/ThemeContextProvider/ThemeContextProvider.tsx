import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

interface IthemeContext {
  dark: boolean;
  toggle?: () => void
}

const defaultContext: IthemeContext = {
  dark: false
}

const ThemeContext = React.createContext(defaultContext);

const useTheme = (): IthemeContext => React.useContext(ThemeContext);

const useDarkMode = () : [IthemeContext, any] => {
  const [contextTheme, setContextTheme] = React.useState<IthemeContext>({ dark: false });  
 
  return [contextTheme, setContextTheme];
}

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contextTheme, setContextTheme] = useDarkMode();

  const activeTheme = contextTheme.dark ? theme("dark") : theme("light");

  const toggle = (): void => {
    setContextTheme({
      dark : !contextTheme.dark
    })
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <ThemeContext.Provider
        value={{
          dark: contextTheme.dark,
          toggle
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export { ThemeContextProvider, useTheme };
