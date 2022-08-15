import Header from "./header";
import PostFeed from "./posts_feed";
import Footer from "./footer";
import React from "react";

const title = 'Tutorials';
const sections = [
    { title: "Home", url: "#/" },
    { title: "Projects", url: "#/projects" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

export default function Tutorials(props) {
    const {tutorials} = props;

    return <React.Fragment>
        <Header title={title} sections={sections} />
        <PostFeed posts={tutorials} subfolder='tutorials'/>
        <Footer />
    </React.Fragment>
}