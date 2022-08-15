import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

export default function MarkdownCard(props) {
    const {post, subfolder} = props;

    return (<Card>
        <CardContent>
            <ReactMarkdown
                children={post[1].split('\n',15).join('\n') + "..."}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            />
        </CardContent>
        <CardActions>
            <Button size='small' href={'#/' + subfolder + "/" + post[0]}>READ MORE</Button>
        </CardActions>
    </Card>);
}