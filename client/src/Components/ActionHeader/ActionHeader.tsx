import React from "react"
import styled from "styled-components"
import Dropdown from "./../Dropdown/Dropdown"
import DropdownMenu from "../Dropdown/DropdownMenu";
import Button from "../Button/Button"

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

const actions = {

}

const ActionHeader: React.FC = () =>{
    return (
        <HeaderNav>
            <h2>Rakesh Shrestha</h2>
            <Actions>
                <Dropdown>
                    <Dropdown.Button menuLabel="visualize">Visualize</Dropdown.Button>
                    <Dropdown.Menu menuLabel="visualize">
                        <DropdownMenu.Item>Dijkistra</DropdownMenu.Item>
                        <DropdownMenu.Item>A* Algorithm</DropdownMenu.Item>
                        <DropdownMenu.Item>Breadth First Search</DropdownMenu.Item>
                        <DropdownMenu.Item>Depth First Search</DropdownMenu.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown> 
                    <Dropdown.Button menuLabel="v2">v2</Dropdown.Button>
                    <Dropdown.Menu menuLabel="v2">
                        <DropdownMenu.Item><div onClick={() => console.log("test")}>test</div></DropdownMenu.Item>
                        <DropdownMenu.Item>secondd one</DropdownMenu.Item>
                        <DropdownMenu.Item>third one</DropdownMenu.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button primary>Visualize</Button>
            </Actions>
        </HeaderNav>
    )    
}

export default ActionHeader;