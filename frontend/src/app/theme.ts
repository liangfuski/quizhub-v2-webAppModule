'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
    cssVariables: true,
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      // secondary: {
      //   light: '#ff7961',
      //   main: '#f44336',
      //   dark: '#ba000d',
      //   contrastText: '#000',
      // },
    },
    colorSchemes: {
      dark: true,
    },
    components: {
      MuiCardContent: {
        styleOverrides: {
          root: {
            "&:last-child": {
              padding: "1em"
            }
          } 
        }
      }
    },
    status: {
        danger: '#ff0000'
    }
});

export default theme;