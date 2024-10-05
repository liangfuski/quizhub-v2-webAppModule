"use client"
import Menu from '@mui/material/Menu';
import { useState, MouseEvent, Fragment } from 'react';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ActionItem, ActionItems } from './util';
import Link from 'next/link';

const NavbarMenu = () => {
    const [ anchorElNav, setAnchorElNav ] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget);
    }
    
    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    }
    return (
        <Fragment>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                open = {Boolean(anchorElNav)}
                // onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' }
                }}
            >
                {
                    ActionItems.map( (a: ActionItem) => (
                        <Link href={a.path} key={a.name}>
                            <MenuItem 
                                    onClick={handleCloseNavMenu}
                            >  
                                    <Typography sx = {{ textAlign: 'center', color: "text.main" }} >
                                        {a.name}
                                    </Typography>
                            </MenuItem>
                        </Link> 
                    ) )
                }
            </Menu>

        </Fragment>
    )
}

export default NavbarMenu; 