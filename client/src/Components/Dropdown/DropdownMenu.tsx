import React from "react"
import styled from "styled-components"
import {DropdownContext} from "./Dropdown"

const DropdownMenuDiv = styled.div<any>`
    ${(props): string => props.open ?  
        `
           height: auto
        `
    : `height: 0; overflow: hidden;`}
`;

export interface NamedChildrenSlots{
    Item: React.FC,
}

export interface IProps{
    menuLabel: string
}

const DropdownMenu: React.FC<IProps> & NamedChildrenSlots = ({children, menuLabel}) => {
    const {active} = React.useContext(DropdownContext)
    if (!children) {
        throw new Error("Children is mandatory");
    }
    return <DropdownMenuDiv open={active === menuLabel}>{children}</DropdownMenuDiv>
}

const DropdownItem: React.FC = ({children}) => {
    if (!children) {
        throw new Error("Children is mandatory");
    }
    return <div>{children}</div>;
}

DropdownMenu.Item = DropdownItem;

export default DropdownMenu;