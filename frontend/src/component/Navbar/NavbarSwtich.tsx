"use client"
import StyleNavBarSwitch from '../StyledMaterialComponent/StyledNavBarSwtich';
import { useContext } from "react";
import { MUIWrapperContext } from "../../context/ThemeContext";

const NavbarSwtich = () => {
    const { toggleColorMode } = useContext(MUIWrapperContext);
    return (
        <StyleNavBarSwitch 
            sx={{ m: 1 }} 
            onChange={toggleColorMode}
        />
    )
}

export default NavbarSwtich;