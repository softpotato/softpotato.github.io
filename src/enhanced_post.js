import { useEffect, useMemo, useState } from "react";
import useWidth from "./custom_hooks/useWidth";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ThemeSwitch from "./theme_switch";
import Code from "./post_components/code";
import Text from "./post_components/text";
import Markdown from "./post_components/markdown";
import Notice from "./post_components/notice";
import DropDown from "./post_components/dropdown";
import Space from "./post_components/space";
import Image from "./post_components/image";
import ProgressBar from "./post_components/progress_bar";
import manifest from "./extensions/manifest";
import Container from "@mui/material/Container";
import TagList from "./tag_list";

function NavButton({ pageID, componentInfo, index, selectedIndex, onClick }) {
    return (<ListItemButton key={pageID + "nav_panel-" + index} selected={index === selectedIndex} onClick={onClick}>
        <ListItemText primary={componentInfo} />
    </ListItemButton>);
}

const drawerWidth = 240;

/**
 * PURPOSE
 * This component is responsible for rendering 
 * a detailed post. 
 * 
 * DESIGN
 * This post is based off the tutorials in the offical
 * Google Kotlin tutorials.
 *      - https://developer.android.com/kotlin/campaign/learn
 * The following is a list of different features the
 * page will have.
 *  - app bar
 *      - [optional] hideable left bar navigation drawer button
 *      - button to return back to search page left aligned 
 *      - title of current section page left aligned
 *      - perma link icon button to get reference to blog post link
 *      - tutorial progress bar used to tell how much the use
 *        has done
 *      - predicted time left in post right of progress bar
 *  - [optional] left navgiation drawer (only active if post needs it)
 *      - large box nagivation drawer with title of pages and
 *        sub sections within page listed in indented and smaller
 *        font size.
 *      - pages titles will switch the current page if it's not
 *        the same as the current.
 *  - bottom section (not affected by navigation bar)
 *      - report bug button
 *      - previous page button (left aligned)
 *      - next page button (right aligned)
 *  - Primary Content
 *      - First Post Page
 *          - The first page generally renders some of the metadata
 *            information and additional information such as the following.
 *              - Title of post
 *              - progress bar of completion
 *              - data posted and date edited
 *              - description
 *      - Renders the following content
 *          - headers (h1, h2, h3, ...)
 *              - each header is added to navigation bar
 *          - paragraph
 *              - markdown support for easier bold and italic
 *                support
 *              - latex support
 *          - drop down content hiden
 *              - hides all children normally
 *              - has title
 *              - has special icon to symbolize purpos
 *                  - alert icon to generally notify or raise attention
 *                  - red stop if to be careful of an error
 *                  - exclamation mark to symbolize general info
 *                  - star to describe definitions or go into certain topics in more detail
 *              - has special color to symbolize prupose
 *          - simple image rendering
 *              - renders image stored in public folder
 *              - [optional] clickable modal zoom
 *          - Image collection rendering
 *              - renders a folder of images
 *              - used for comics
 *              - mostly a bunch of clumped together vertical scrolling
 *          - tools
 *              - general purpose stuff, so can be anything you want. Stored in
 *                extensions.
 *              - progress bar
 *                  - to signify progress of how much the post is complete
 *              - pdf renderer
 *                  - to display resumes and other PDF documents.
 *              - Rimworld clothing temperature calculator
 *              - simple graph and bar chart
 *              - kanban chart
 *              - Leetcode planner
 *              - Webpage Content Generator
 *              - Game
 *          - hyperlink to another page for reference. 
 *          - code block
 *              - can swap between languages
 *              - if javascript, optional code running? Like in MDN docs?
 *              - code highlighting
 *  - Extra Features
 *      - end of tutorial confetti
 *      - completion of tutorial green button to head back to search page
 * 
 * WARNING
 * This code is going to be messy. It's very hard to avoid doing so when
 * you add app bars and side drawers.
 * 
 * RANDOM IDEA
 * I want to be able to create a UI using the post format. The issue is
 * creating hooks out of functions and having the centralized state manage
 * the UI. Probably won't do it, but cool idea thinking about it.
 * 
 * CITATION
 * We'll primarily be using this app bar layout for the page.
 * https://mui.com/material-ui/react-drawer/#clipped-under-the-app-bar
 * 
 * I wanted to use persistant drawer, but I just don't like the code.
 * It's really hard for me to read and I don't understand the Emotion
 * styling part. I might revisit another time, but this isn't necessary.
 * 
 * I'm going to approach this differently. There are 2 drawer styles we'll
 * use.
 *  1) persistant drawer for desktop
 *  2) swipeable drawer with side toggle button for mobile
 * The reason for this is because space isn't as important for desktop, so it's
 * fine to have the permanent drawer on the left side. Many webpages have this.
 * 
 * The swipeable drawer is for better mobile support so we can hide the menu.
 * If we're on phone, the drawer of course still needs to be a drawer, but 
 * when opened. It will be the main focus of the webpage. 
 * 
 * Mobile Detection API - we'll use this to detect mobile devices.
 * https://www.npmjs.com/package/react-device-detect
 * 
 * 
 * @param {Object} post
 */
export default function EnhancedPost({ post }) {
    const pageID = "post-" + post["perma-link"];

    // Webpage width, used for detecting when the webpage
    // is xs, sm, md, or lg sized.
    const pageWidth = useWidth();

    const [page, setPage] = useState(-1); // the page # the user is on
    const [open, setOpen] = useState(pageWidth !== "xs"); // If the navigation bar is open or

    useEffect(() => {
        setOpen(pageWidth !== "xs");
    }, [pageWidth]);

    useEffect(() => {
        // TODO: Load in the user's page
    }, []);

    // This creates the page's navigation
    //  Note: This is a stupid version currently. It only takes
    //        the page headers and renders it on the left side bar.
    const pageNavigation = useMemo(() => {
        const navBarContents = [];

        // push metadata page
        navBarContents.push(
            <NavButton
                key={`${pageID}-nav_button-main`}
                pageID={pageID}
                componentInfo={post["title"]}
                index={-1}
                selectedIndex={page}
                onClick={() => { setPage(-1) }} />
        )

        for (let i = 0; i < post["pages"].length; i++) {
            navBarContents.push(<NavButton key={`${pageID}-nav_button-${i}`} pageID={pageID} componentInfo={post["pages"][i]["content"]} index={i} selectedIndex={page} onClick={() => { setPage(i) }} />);
        }
        return navBarContents;

    }, [post, page, pageID]);

    const currentPage = useMemo(() => {

        /**
         * This function is primarily responsible
         * for mapping the JSON objects of the post
         * to JSX. 
         * 
         * @param {Object} content 
         * @param {string} parentID - used to generate unique key values
         * @param {number} index - used to generate unique key numbers
         */
        const renderContents = (content, parentID, index) => {
            const currID = `${parentID}-${content["type"]}_${index}`;

            switch (content["type"]) {
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "body1":
                case "body2":
                case "subtitle1":
                case "subtitle2":
                case "caption":

                    return <Text
                        key={currID}
                        type={content["type"]}
                        text={content["content"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "markdown":

                    return <Markdown
                        key={currID}
                        text={content["content"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "dropdown":

                    return <DropDown
                        key={currID}
                        currID={currID}
                        text={content["content"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "code":

                    return <Code
                        key={currID}
                        codeInfo={content}
                        componentID={currID}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "static-image":

                    return <Image
                        key={currID}
                        src={content["content"]}
                        alt={content["alt-text"]}
                        caption={content["caption"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "3d":

                    // TODO: Make 3d assets work
                    return null;

                case "notice":

                    return <Notice
                        key={currID}
                        text={content["content"]}
                        severity={content["severity"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "progress-bar":

                    return <ProgressBar
                        key={currID}
                        value={content["value"]}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />

                case "tool":

                    return manifest(content["type"], content["data"]);

                default:

                    return <Space
                        key={currID}
                        children={
                            "sections" in content && content["sections"].length > 0 ?
                                content["sections"].map((obj, index) => { return renderContents(obj, currID, ++index); })
                                :
                                null
                        }
                    />;
            }
        }

        // If it is home page
        if (page === -1) {
            const dateCreated = new Date();
            const dateUpdated = new Date();
            dateCreated.setTime(Date.parse(post.created));
            dateUpdated.setTime(Date.parse(post.updated));

            // https://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

            // Note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth

            return (
                <Container>
                    <Typography variant="h2">
                        {post["title"]}
                    </Typography>
                    <Typography variant="subtitle1">
                        {`Created: ${dateCreated.toLocaleDateString(navigator.language || navigator.userLanguage)}`}
                    </Typography>
                    <Typography variant="subtitle1" mb="1rem">
                        {`Updated: ${dateUpdated.toLocaleDateString(navigator.language || navigator.userLanguage)}`}
                    </Typography>
                    <Typography variant="body1" mb="5rem">
                        {post["description"]}
                    </Typography>
                    <TagList
                        pageID={pageID}
                        tags={[post.type, ...post.tags, post.status, ...post["programming_languages"], post.language]}
                        hyperlinks={[post.type, ...post.tags, post.status, ...post["programming_languages"], post.language].map(
                            (tag) => {
                                return `#/tags/${tag}`;
                            }
                        )}
                        renderLimit={1000}
                    />
                </Container>
            )
        }

        // if it is not home page, so normal case
        return renderContents(post["pages"][page], `${pageID}-main-content-${page}`, page);

    }, [post, page, pageID]);

    return <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${open ? drawerWidth : 0}px)`, ml: `${open ? drawerWidth : 0}` }}>
            <Toolbar sx={{ display: "flex" }}>
                <Typography variant="h5" component="h1" sx={{ flexGrow: "1" }}>
                    {post["title"]}
                </Typography>
                <ThemeSwitch />
            </Toolbar>
        </AppBar>
        {!open ?
            <SwipeableDrawer anchor="left" open={open} onOpen={() => { setOpen(true) }} onClose={() => { setOpen(false) }}>
                <Toolbar>
                    <Button children="< Return" href="#" />
                </Toolbar>
                <Divider />
                <List>
                    {pageNavigation}
                </List>
            </SwipeableDrawer>
            :
            <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', }, }} variant="permanent" anchor="left">
                <Toolbar>
                    <Button children="< Return" href="#" />
                </Toolbar>
                <Divider />
                <List>
                    {pageNavigation}
                </List>
            </Drawer>}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            <Paper sx={{
                ml: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' },
                mr: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' },
                pl: "2rem", pr: "2rem", pt: "1rem", pb: "1rem"
            }} elevation={8}>
                {currentPage}
            </Paper>
        </Box>
        <Button
            variant="contained"
            sx={{ position: "fixed", left: `${open ? `calc(2rem + ${drawerWidth}px)` : '2rem'}`, bottom: "1rem" }}
            onClick={() => { setPage(page - 1) }}
            disabled={page <= -1}
        >
            Previous
        </Button>
        <Button
            variant="contained"
            sx={{ position: "fixed", right: "2rem", bottom: "1rem" }}
            onClick={() => { setPage(page + 1) }}
            disabled={page >= post["pages"].length - 1}
        >
            Next
        </Button>
    </Box>
}