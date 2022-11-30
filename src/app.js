import React, { useState, useEffect, useMemo } from "react";
import FrontPage from "./front_page";
import Post from "./post";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HashRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import BlogStateManager from "./state/blog_state_manager";
import ErrorPage from "./error_page";
import SectionPage from "./section_page";
import EnhancedPost from "./enhanced_post";

// Manual Language Pack Imports
import English from './lang/english.json';
import Emoji from './lang/emoji.json';
import French from './lang/french.json';

// useContext resource https://beta.reactjs.org/apis/react/createContext
export const SettingContext = React.createContext([null, null]); // passes down 2 callback functions

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

// This is a reference to the class handling all state code. 
const postStorageInterface = new BlogStateManager(jsonPosts);

// The following code handles localization files. 

// enum of languages
export const LANGUAGES = {
    ENGLISH: 'english',
    EMOJI: 'emoji',
    FRENCH: 'french'
}

// hash map to convert language key to actual JSON data set
const languageMapping = {
    'english': English,
    'emoji': Emoji,
    'french': French
};

export default function App() {
    // This fields stores the front page posts. 
    const [primaryPosts, setPrimaryPosts] = useState([]);

    // The current language used by the webpage
    const [language, setLanguage] = useState(languageMapping[LANGUAGES.ENGLISH]);

    const changeLanguage = (newLang) => {
        setLanguage(languageMapping[newLang]);
    }

    // Theme state
    const [mode, setMode] = React.useState('dark');

    const [tags, setTags] = React.useState([[], [], [], [], []]);

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
            // If you don't want the name of the file to determine order, then 
            // you can use this store function to do it based off the largest
            // ID value of the post.
            setPrimaryPosts(parsedPosts.sort((a, b) => b[0] - a[0]));
        }
        fetchPostFiles();

        async function fetchTags() {
            const data = await postStorageInterface.getTags();
            setTags(data);
        }
        fetchTags();

        // This function retrieves all tag information and it is passed down
        // to all children elements that have search functionality.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // I'm looking at this code a month or 2 later, and I've been scratching my head
    // at what the fuck I wrote or copied and pasted. It looks like a lambda function
    // but instead of calling code, it returns an object with a function.
    //
    // Looks stupid as fuck if I just wanted a callback function. No need to wrap it
    // in a memo, since there is nothing being memoized. 
    // const colorMode = React.useMemo(
    //     () => ({
    //         toggleColorMode: () => {
    //             setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    //         }
    //     }),
    //     []
    // );

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode
                }
            }),
        [mode]
    );

    /**
    * Tab Layout
    * ==========
    * This array is used as the base template for generating the routes.
    * However, included tags also need to include a paired piece of
    * data, language. This is a small quality of life feature that will
    * make users searching a little easier if we just assume that they're
    * ONLY looking for stuff in their target language. 
    * 
    * However, we'll do this through the use of the hook useMemo. The
    * reason we use useMemo over useEffect is because we ONLY need an
    * output value of the sections rendered if the given language changes.
    * useEffect works, but we'll need to create a useState or something
    * in order to cascade the change into the DOM.
    */
    const sectionPages = useMemo(() => {
        const sections = [
            { key: "projects", includedTags: ["project"] },
            { key: "tutorials", includedTags: ["tutorial"] },
            { key: "tools", includedTags: ["tool"] },
            { key: "search", includedTags: [] }
        ];
        return sections.map((entry) => {
            const resourceKey = "section-" + entry.key + "-title";
            return <Route
                key={entry.key}
                path={entry.key}
                element={<SectionPage sectionKey={entry.key}
                    title={resourceKey in language ? language[resourceKey] : entry.key}
                    tags={tags}
                    enforcedTags={[...entry.includedTags, language.language]}
                    queryInterface={postStorageInterface} />}
            />
        })
    }, [language, tags]);

    /**
     * This chunk of code generates the tag pages.
     * This is similar to the sections pages, but
     * this is specific for tags. These pages should
     * also be language restricted (except for the 
     * language tag). 
     * 
     * We'll use another useMemo again to generate
     * all the pages.
     */
    const tagPages = useMemo(() => {
        const outputTagPages = [];

        // iterate over all tags but the last language tag groups
        for (let i = 0; i < tags.length; i++) {

            // iterate over the tags list and make pages
            // Note: The ternary in enforcedTags handles language, since we shouldn't
            //          have say a spanish selected tag get interfered with the default
            //          set language (say english). 
            // Also: The ternary in title is iffy, since tags aren't necessarily in the
            //          translation files. If there is an alternate name, it'll retrieve it.
            //          else, it uses it's default english name.
            for (let j = 0; j < tags[i].length; j++) {
                const tagName = tags[i][j];
                outputTagPages.push(
                    <Route
                        key={tagName}
                        path={"tags/" + tagName.replace(" ", "_")}
                        element={<SectionPage
                            sectionKey={tagName}
                            title={tagName in language ? language[tagName] : tagName}
                            tags={tags}
                            enforcedTags={i !== tags.length - 1 ? [tagName, language.language] : [tagName]}
                            queryInterface={postStorageInterface} />}
                    />
                );
            }
        }

        return outputTagPages;
    }, [tags, language]);

    const postPages = useMemo(() => {
        return jsonPosts.map((post) => {
            return <Route 
                key={"post-" + post["perma-link"]}
                path={"posts/" + post["perma-link"]}
                element={
                    <EnhancedPost post={post} />
                }
            />;
        });

    }, []);

    /**
     * If you see this. It's attrocious. I agree.
     * I might be overusing the useContext. Maybe I should 
     */
    return (
        <SettingContext.Provider value={{ mode, toggleColorMode, language, changeLanguage }} >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <Routes>
                        <Route path="/">
                            <Route path="*" element={<ErrorPage />} />
                            <Route index element={<FrontPage pageID="front-page" posts={primaryPosts} />} />
                            {primaryPosts.map((post) => { // Renders post links
                                return <Route key={post[0]} path={"posts/" + post[0]} element={<Post post={post} />} />
                            })}
                            {sectionPages}
                            {tagPages}
                            {postPages}
                        </Route>
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </SettingContext.Provider>
    );
}