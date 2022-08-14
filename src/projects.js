import Header from "./header"
import React, { useState, useEffect } from "react";
import PostFeed from "./posts_feed";
import Footer from "./footer";

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const title = "Projects";
const sections = [
    { title: "Home", url: "#/" },
    { title: "Tutorials", url: "#/tutorials" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

const importAll = r => r.keys().map(r);
const markdownFiles = importAll(require.context('./projects', false, /\.md$/)).sort();

export default function Projects(props) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const posts = await Promise.all(
                markdownFiles.map((file) => fetch(file).then((res) => res.text())))
                .catch((err) => console.error(err));
            setProjects(posts);
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Header title={title} sections={sections} />
            <PostFeed posts={projects} />
            <Footer />
        </React.Fragment>
    );
}