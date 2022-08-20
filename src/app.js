import React, { useState, useEffect } from "react";
import Blog from "./blog";
import Projects from "./projects";
import Post from "./post";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { HashRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Tutorials from "./tutorials";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

// https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
const importAll = r => r.keys().map(r);
const tutorialFiles = importAll(require.context('./tutorials', false, /\.md$/)).sort();
const projectFiles = importAll(require.context('./projects', false, /\.md$/)).sort();
const postFiles = importAll(require.context('./posts', false, /\.md$/)).sort().reverse()

export default function App(props) {
    // File Import
    const [tutorials, setTutFiles] = useState([]);
    const [projects, setProjFiles] = useState([]);
    const [posts, setPostFiles] = useState([]);

    useEffect(() => {
        async function fetchTutorialFiles() {
            const posts = await Promise.all(
                tutorialFiles.map((file) => fetch(file).then((res) => res.text() )))
                .catch((err) => console.error(err));
            const parsedPosts = [];
            for (let i = 0; i < posts.length; i++) {
                parsedPosts.push(posts[i].split('|'));
            }
            setTutFiles(parsedPosts);
        }
        async function fetchProjectFiles() {
            const posts = await Promise.all(
                projectFiles.map((file) => fetch(file).then((res) => res.text())))
                .catch((err) => console.error(err));
            const parsedPosts = [];
            for (let i = 0; i < posts.length; i++) {
                parsedPosts.push(posts[i].split('|'));
            }
            setProjFiles(parsedPosts);
        }
        async function fetchPostFiles() {
            const posts = await Promise.all(
                postFiles.map((file) => fetch(file).then((res) => res.text())))
                .catch((err) => console.error(err));
            const parsedPosts = [];
            for (let i = 0; i < posts.length; i++) {
                parsedPosts.push(posts[i].split('|'));
            }
            setPostFiles(parsedPosts);
        }
        fetchTutorialFiles();
        fetchProjectFiles();
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
                            <Route index element={<Blog posts={posts} />} />
                            <Route path="projects" element={<Projects projects={projects} />} />
                            <Route path="tutorials" element={<Tutorials tutorials={tutorials} />} />
                            {tutorials.map((post) => {
                                return <Route key={post[0]} path={"tutorials/" + post[0]} element={<Post post={post} />} />
                            })}
                            {projects.map((post) => {
                                return <Route key={post[0]} path={"projects/" + post[0]} element={<Post post={post} />} />
                            })}
                            {posts.map((post) => {
                                return <Route key={post[0]} path={"posts/" + post[0]} element={<Post post={post} />} />
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