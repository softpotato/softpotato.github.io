import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactMarkdown from 'react-markdown';
import Grid from '@mui/material/Grid';

export default function BodyFeed(props) {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        setFeed(props.content);
    }, [props.content]);

    return (
        feed.map((post, i) => {
            return <Grid item key={"post" + i}>
                <Card>
                    <CardContent>
                        <ReactMarkdown children={post} />
                    </CardContent>
                </Card>
            </Grid>
        })
    );
}