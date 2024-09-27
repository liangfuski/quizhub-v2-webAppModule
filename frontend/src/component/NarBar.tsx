"use client"
import {useState, MouseEvent} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FactoryIcon from '@mui/icons-material/Factory';
import { keyframes } from '@emotion/react';
import { SxProps } from '@mui/system';

const rainbowBorderAnimation = keyframes`
  0% {
    border-image: linear-gradient(0deg, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 2;
  }
  50% {
    border-image: linear-gradient(90deg, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 2;
  }
  100% {
    border-image: linear-gradient(180deg, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 2;
  }
`;
const generateActionButtonStyle = (action: string): SxProps => {
    const basicStyle = { 
            my: 2, 
            color: 'white', 
            display: "block",
            '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -7,
                height: '2px',
                backgroundColor: 'white',
                transform: 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.3s ease',
                },
            '&:hover::after': {
                transform: 'scaleX(1)',
                transformOrigin: 'left',
            },
            // without transformation
            // '&:hover::after': {
            //     content: '""',
            //     position: 'absolute',
            //     left: 0,
            //     right: 0,
            //     bottom: '-5px', // Adjust this value to control the distance from the button
            //     height: '2px',  // Height of the underline
            //     backgroundColor: 'white',
            //     width: '100%',  // Full-width underline
            // },
        }

    const rainbowBorderStyle = action === "AI Quiz Generation" ? {
        border: '3px solid transparent',
        animation: `${rainbowBorderAnimation} 2s linear infinite`,
    } : {}
    
    return {...basicStyle, ...rainbowBorderStyle}
}

const actions = ["Create Quiz", "Manage Quiz", "AI Quiz Generation",]


export function NarBar() {
    const [ anchorElNav, setAnchorElNav ] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget);
    }
    
    const handleCloseNavMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElNav(null);
    }

    return (
        <AppBar position="static" sx={{mb: 5}} color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <FactoryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-reponsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                    >
                        QuizHub
                    </Typography>
                    <Box sx = {{ flexGrow: 1, 
                        display: { xs: 'flew', md: 'none' } }} >
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
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {
                                actions.map( (page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx = {{ textAlign: 'center' }} >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ) )
                            }
                        </Menu>
                    </Box>
                    <FactoryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography sx={{ flexGrow: 1,
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                    >
                        QuizHub
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {actions.map((action) => (
                            <Button
                                key={action}
                                onClick={(ele)=>{console.log("ele: ", ele)}}
                                sx={generateActionButtonStyle(action)}
                            >
                                {action}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            sx={{
                                color: "white"
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>  
            </Container>
        </AppBar>
    )
}