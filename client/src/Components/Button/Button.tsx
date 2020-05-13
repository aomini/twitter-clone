import React from "react";
import styled from "styled-components";
import { ITheme } from "./../ThemeContextProvider/theme";

const ButtonLink = styled.button<any>`
  padding: 5px 10px;
  color: ${(props): string => props.theme.btn.primary.text};
  border: none;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: fit-content;

  ${(props): string =>
    props.dropdown
      ? `
    // width: 150px;
    text-align: center;
    background: transparent;
  `
      : ``}

  ${(props): string =>
    props.default
      ? `
    background: ${props.theme.btn.default.body};
    color: ${props.theme.btn.default.text};
    border-radius: 4px;
  `
      : ``}

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const DefaultButtonLink = styled(ButtonLink)`
  background: ${(props): string => props.theme.btn.default.body};
  color: ${(props): string => props.theme.btn.default.text};
  border-radius: 4px;
`;

interface IButtonProps {
  onHandleClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  dropdown?: boolean;
  primary?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onHandleClick,
  primary = false,
  dropdown = false,
}) => {
  return (
    <ButtonLink onClick={onHandleClick} dropdown={dropdown} default={primary}>
      {children}
    </ButtonLink>
  );
};

export default Button;
