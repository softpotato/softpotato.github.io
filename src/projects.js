import Header from "./header"
import React from "react";
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const title = "Projects";
const sections = [
    { title: "Home", url: "#/" },
    { title: "Tutorials", url: "#/tutorials" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

export default function Projects(props) {

    return (
        <React.Fragment>
            <Header title={title} sections={sections} />
            <Grid container>
                <Grid item xs={4}>
                    <ReactMarkdown
                        children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}