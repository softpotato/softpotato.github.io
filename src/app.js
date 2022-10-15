import React, { useState, useEffect } from "react";
import Blog from "./blog";
import Post from "./post";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { HashRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import EnhancedPost from "./enhanced_post";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

// NOTE: There are 2 imports for posts. One is markdown and the other is json
// files. JSON is for special posts such as project status and info, tutorials,
// or web tools that I'm integrating to the webpage.

// For the purpose of this webpage, markdown posts will be used solely for the
// primary feed's posts of general content information updates and such. The
// reason for that is due to the limiting nature of markdown files. additional
// metadata is difficult to incorporate without adding special parsers or syntax.
// it was simpler to straight up store everything as a JSON file.

// This imports all markdown files that are rendered simply in the homepage
// https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
const importAll = r => r.keys().map(r);
const markdownPostFiles = importAll(require.context('./posts', false, /\.md$/));

// This imports all JSON files as JSON. For some reason, JSON is imported and parsed directly w/o
// extra work.
const jsonPosts = importAll(require.context('./posts', false, /\.json$/));

export default function App(props) {
    // This fields stores all primary posts
    const [primaryPosts, setPrimaryPosts] = useState([]);

    // This field stores all sorted posts
    const [projects, setProjects] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [webtools, setWebtools] = useState([]);
    // Note: The webtools json doesn't actually specify the code used.
    // the code is accessible by all json files, it's just an easy way to
    // easily way to format and organize web tools to include description
    // and other stuff without manually creating it every time.


    // This function gets called on compilation
    useEffect(() => {

        // This fetches all markdown files and imports it.
        async function fetchPostFiles() {
            const posts = await Promise.all(
                markdownPostFiles.map((file) => fetch(file).then((res) => res.text())))
                .catch((err) => console.error(err));
            const parsedPosts = [];
            for (let i = 0; i < posts.length; i++) {
                parsedPosts.push(posts[i].split('|'));
            }
            setPrimaryPosts(parsedPosts);
        }
        fetchPostFiles();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Theme state
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
                    mode: mode
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
                            <Route index element={<Blog posts={primaryPosts} />} />
                            {primaryPosts.map((post) => {
                                return <Route key={post[0]} path={"main_feed/" + post[0]} element={<Post post={post} />} />
                            })}
                            {jsonPosts.map((post, key) => {
                                return <Route key={key} path={"posts/" + key} element={<EnhancedPost content={post} />} />
                            })}
                        </Route>
                    </Routes>
                </HashRouter>
                <Fab size='medium' color='secondary' onClick={colorMode.toggleColorMode} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </Fab>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}