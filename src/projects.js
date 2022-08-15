import Header from "./header"
import React from "react";
import PostFeed from "./posts_feed";
import Footer from "./footer";

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const title = "Projects";
const sections = [
    { title: "Home", url: "#/" },
    { title: "Tutorials", url: "#/tutorials" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

export default function Projects(props) {
    const {projects} = props;

    return (
        <React.Fragment>
            <Header title={title} sections={sections} />
            <PostFeed posts={projects} subfolder='projects' />
            <Footer />
        </React.Fragment>
    );
}