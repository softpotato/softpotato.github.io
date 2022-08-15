import Grid from '@mui/material/Grid';
import MarkdownCard from './markdown_card';

export default function BodyFeed(props) {
    const {content, subfolder} = props;

    return (
        content.map((post, i) => {
            return <Grid item key={"post" + i}>
                <MarkdownCard 
                    post = {post}
                    subfolder = {subfolder}
                />
            </Grid>
        })
    );
}