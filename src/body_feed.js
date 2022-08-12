import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function BodyFeed(props) {

    const input = '# Hello World \n\n This is a test page content';

    return <ReactMarkdown children={input} />
}