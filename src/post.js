import Header from './header';
import Footer from "./footer";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fragment, useContext } from 'react';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import style from './markdown-styles.module.css';
import { SettingContext } from './app';

/**
 * A post is an old version of the current rendering system. It
 * can ONLY render a raw markdown input. I use it primarily for
 * the primary feed, where it doesn't require any data parsing
 * or sorting.
 * 
 * @param {*} props 
 * @returns 
 */
export default function Post(props) {
    const { post } = props;

    const { language } = useContext(SettingContext);

    return (<Fragment>
        <Header title={language['primary-post-title']} sections={language['primary-post-navigation']} />
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