import React from "react";
import Button from "../Button/Button";
import { DropdownContext } from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IProps {
  children: React.ReactNode;
  menuLabel: string;
}

const DropdownButton: React.FC<IProps> = ({ children, menuLabel }) => {
  const { active, activateDropdown } = React.useContext(DropdownContext);
  if (!children) {
    throw new Error("Children is mandatory");
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    activateDropdown && activateDropdown(menuLabel);
  };

  return (
    <Button onHandleClick={handleClick} dropdown={true}>
      {children}
      &nbsp;
      {(menuLabel === active && (
        <FontAwesomeIcon icon="caret-up" size="lg" />
      )) || <FontAwesomeIcon icon="caret-down" size="lg" />}
    </Button>
  );
};

export default DropdownButton;
