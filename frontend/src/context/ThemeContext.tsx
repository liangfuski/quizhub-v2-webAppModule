"use client";

import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useState, useMemo} from 'react';

export const MUIWrapperContext = createContext({
    toggleColorMode: () => {}
});

export default function ThemeContextProvider({ 
    children
}:Readonly<{
    children: React.ReactNode
}>) {
    const [mode, setMode] = useState<PaletteMode>("light");
    // console.log("mode is changed ::: ", mode)

    const muiWrapperUtils = useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
          },
        }),
        []
    );

    const theme = useMemo(
        () => createTheme({
        cssVariables: true,
        palette: {
            mode,
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
            components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: "none"
                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                root: {
                    "&:last-child": {
                    padding: "1em"
                    }
                } 
                }
            },
            MuiCssBaseline: {
                styleOverrides: {
                  body: {
                    backgroundColor: mode === 'light' ? '#F7FCFF' : '#000000', // Set body background color
                  },
                },
            },
            },
            status: {
                danger: '#ff0000'
            }
        }),
        [mode]
    );

    return (
        <MUIWrapperContext.Provider value={muiWrapperUtils}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MUIWrapperContext.Provider>
    );
}