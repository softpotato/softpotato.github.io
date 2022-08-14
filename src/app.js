import React from "react";
import Blog from "./blog";
import Projects from "./projects";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { HashRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Tutorials from "./tutorials";

const ColorModeContext = React.createContext({toggleColorMode: () => {}})

export default function App(props) {
    const [mode, setMode] = React.useState('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode
                }
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Blog />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="tutorials" element={<Tutorials />} />
                        </Route>
                    </Routes>
                </HashRouter>
                <Fab size='medium' color='secondary' onClick={colorMode.toggleColorMode} sx={{position: 'fixed', bottom: 16, right: 16}}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </Fab>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}