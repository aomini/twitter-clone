import React from "react";
import styled from "styled-components";
import { ITheme } from "./../ThemeContextProvider/theme";

const ButtonLink = styled.div`
  padding: 5px 10px;
  color: ${(props): string => props.theme.btn.primary.text};
  border: none;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const DefaultButtonLink = styled(ButtonLink)`
  background: ${(props: { theme: ITheme }): string =>
    props.theme.btn.default.body};
  color: ${(props: { theme: ITheme }): string => props.theme.btn.default.text};
  border-radius: 4px;
`;

interface IButtonProps {
  onHandleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onHandleClick
}) => {
  return (
    <ButtonLink onClick={onHandleClick}>
      {children}
    </ButtonLink>
  );
};

export default Button;
