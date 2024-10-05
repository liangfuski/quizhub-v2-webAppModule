import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomButton from '../CustomButton';
import FactoryIcon from '@mui/icons-material/Factory';
import { keyframes } from '@emotion/react';
import { SxProps } from '@mui/system';
import NarbarMenu from './NavBarMenu';
import NavbarSwtich from './NavbarSwtich';
import "./NavBar.scss";
import Link from 'next/link';
import { ActionItem, ActionItems } from './util';


const generateActionButtonStyle = (action: string): SxProps => {
    const basicStyle = { 
            my: 1, 
            color: 'white', 
            display: "block",
            border: "3px solid transparent",
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
        }
    
    return {...basicStyle}
}



export default function NavBar() {

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
                            <NarbarMenu/>
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
                        {ActionItems.map((action: ActionItem) => (
                            <Box
                                key={action.name}
                            >
                                <Link href={action.path}>
                                    <CustomButton
                                        className={action.name === "AI Quiz Generation" ? 'rainbow-border' : ''} 
                                        sx={generateActionButtonStyle(action.name)}
                                    >
                                            {action.name}
                                    </CustomButton>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <CustomButton
                            sx={{
                                color: "white"
                            }}
                            // onClick={()=>{console.log("clicked")}}
                        >
                            Logout
                        </CustomButton>
                    </Box>
                    <NavbarSwtich />
                </Toolbar>  
            </Container>
        </AppBar> 
    )
}