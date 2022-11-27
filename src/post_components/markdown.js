import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import style from '../markdown-styles.module.css';
import { Fragment } from 'react';

export default function Markdown({ text, children }) {

    return (
        <Fragment>
            <ReactMarkdown remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                className={style.ReactMarkDown}>
                {text}
            </ReactMarkdown>
            {children}
        </Fragment>);
}