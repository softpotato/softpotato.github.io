import Header from './header';
import Footer from "./footer";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fragment } from 'react';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import style from './markdown-styles.module.css';

const title = "Post";
const sections = [
    { title: "Home", url: "#/" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

export default function Post(props) {
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
                    className={style.ReactMarkDown}
                />
            </CardContent>
        </Card>
        <Footer />
    </Fragment>
    );
}