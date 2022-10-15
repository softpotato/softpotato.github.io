import Grid from '@mui/material/Grid';
import PreviewCard from './preview_card';

/**
 * This is a helper function to body. This renders all content
 * in an array of cards given the size.
 * 
 * @param {*} props 
 * @returns 
 */
export default function BodyFeed(props) {
    const {content, subfolder} = props;

    return (
        content.map((post, i) => {
            return <Grid item key={"post" + i}>
                <PreviewCard 
                    post = {post}
                    subfolder = {subfolder}
                />
            </Grid>
        })
    );
}