import React from "react"
import styled from "styled-components"
import {DropdownContext} from "./Dropdown"

const DropdownMenuDiv = styled.div<any>`
    position: absolute;
    top: 52px;
    min-width: 150px;
    background: ${(props): string => props.theme.list.body};
    box-shadow: 1px 0px 5px 2px #eec236;
    box-shadow: -2px -4px 100px -20px rgba(50,50,93,.25), 0 30px 30px -30px rgba(0,0,0,.3), 0 -18px 60px -10px rgba(0,0,0,.025);
    ${(props): string => props.open ?  
        `
            height: auto;
            padding: 10px;

        `
    : `height: 0; overflow: hidden;`}

    &:before{
        content: "";
        position: absolute;
        top: -5px;
        width: 0; 
        height: 0; 
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;        
        border-bottom: 5px solid ${(props): string => props.theme.list.body}
    }
    
`;

const DropdownItemDiv = styled.div<any>`
    padding: 10px;
    &:hover{
        background: ${(props): string => props.theme.listHover.body};
        color: ${(props): string => props.theme.listHover.text};
        cursor: pointer;
    }
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
    return <DropdownItemDiv>{children}</DropdownItemDiv>;
}

DropdownMenu.Item = DropdownItem;

export default DropdownMenu;