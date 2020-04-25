import React from "react"
import styled from "styled-components"
import {ITheme} from "./../ThemeContextProvider/theme"

const HeaderNav = styled.nav`
    display:  flex;
    justify-content: space-between;
    align-items: center;
    background: ${(props): string => props.theme.section};
    padding: 8px;

    >h2{
        margin: 0;
    }
`;

const HeaderLogo = styled.div`
`
const Actions = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-grow: 0.1;
`;

const ButtonLink = styled.div`
    padding : 5px 10px;   
    color: ${(props): string => props.theme.btn.primary.text};
    border: none;
    outline: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: fit-content;
    &:hover{
        cursor: pointer;
    }
`;

const DefaultButtonLink = styled(ButtonLink)`
    background: ${(props: {theme: ITheme}) : string => props.theme.btn.default.body};
    color: ${(props: {theme: ITheme}) : string => props.theme.btn.default.text};
    border-radius: 4px;
`;

const actions = {

}

const ActionHeader: React.FC = () =>{
    return (
        <HeaderNav>
            <h2>Rakesh Shrestha</h2>
            <Actions>
                <DefaultButtonLink>Visualize</DefaultButtonLink>
                <ButtonLink>Add Button</ButtonLink>
                <ButtonLink>Clear</ButtonLink>
            </Actions>
        </HeaderNav>
    )    
}

export default ActionHeader;