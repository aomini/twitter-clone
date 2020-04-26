import React, {ReactChild} from "react"
import {IProps as IDropdownToggle} from './DropdownButton'
import {NamedChildrenSlots as IMenuNamedChildrenSlots, IProps as IMenuProps} from './DropdownMenu'
import DropdownButton from "./DropdownButton"
import DropdownMenu from "./DropdownMenu";

interface IProps{
    children: Array<ReactChild | NamedChildrenSlots>,
}

interface NamedChildrenSlots{
    Button: React.FC<IDropdownToggle>;
    Menu: React.FC<IMenuProps> & IMenuNamedChildrenSlots;
}

interface IContextProps{
    active: string;
    activateDropdown ?: (dropdown: string) => void;
}

export const DropdownContext = React.createContext<IContextProps>({
    active: ''
});

const Dropdown: React.FC<IProps> & NamedChildrenSlots = ({children}) => {
    const [activeDropdown, setActiveDropdown] = React.useState<Readonly<string>>(""); 

    const activateDropdown = (dropdown: string): void => {
        !activeDropdown ? setActiveDropdown(dropdown) : setActiveDropdown("")
    }
    
    const resetDropdown = (): void => {
        activateDropdown("")   
    }

    if (!children) {
        throw new Error("Children is mandatory");
    }
    return (
        <DropdownContext.Provider value={{
            active: activeDropdown,
            activateDropdown
        }}>
            <div onBlur={resetDropdown} tabIndex={0}>{children}</div>
        </DropdownContext.Provider>
    )
}

Dropdown.Button = DropdownButton
Dropdown.Menu = DropdownMenu

export default Dropdown;