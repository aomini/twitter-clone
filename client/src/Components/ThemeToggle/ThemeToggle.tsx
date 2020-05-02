import React from "react";
import { useTheme } from "../ThemeContextProvider/ThemeContextProvider";
import { ThemeStyle } from "./theme-toggle.styles";

const ThemeToggle: React.FC = () => { 

  const { toggle, dark } = useTheme();

  return <ThemeStyle>
    <div data-time={dark ? "night" : "day"} className="Toggle" onClick={toggle}>
      <div className="Button" ></div>
    </div>
  </ThemeStyle>;
};

export default ThemeToggle;
