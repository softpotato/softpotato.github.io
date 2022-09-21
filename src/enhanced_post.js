import Header from './header';
import Footer from "./footer";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fragment } from 'react';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const title = "Post";
const sections = [
    { title: "Home", url: "#/" },
    { title: "Projects", url: "#/projects" },
    { title: "Tutorials", url: "#/tutorials" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

/**
 * This a slight variation on a post component, where the
 * content has better separation and is better to be read.
 * Also, this includes optional features such as side drawer
 * content bars, however, this requires a different format
 * for the content. I've been messing a bit around with 
 * UWP applications, so I might create a text editor to
 * help with writing these blog posts. At least so it's
 * not as weirdly bizarre and text editor heavy as this
 * one.
 * 
 * TODO: TO Finish this thought
 * 
 * @param {*} props 
 * @returns 
 */
export default function EnhancedPost(props) {
    const { post } = props;

    return (<Fragment>
        <Header title={title} sections={sections} />
        <Card
            sx={{
                ml: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' },
                mr: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' },
                pl: { xs: '1rem', sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem' },
                pr: { xs: '1rem', sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem' }
            }}
        >
            <CardContent>
                <ReactMarkdown
                    children={post[1]}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                />
            </CardContent>
        </Card>
        <Footer />
    </Fragment>
    );
}