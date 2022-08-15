import Grid from '@mui/material/Grid';
import MarkdownCard from './markdown_card';

/**
 * This function renders a large grid
 * of posts and links to a separate
 * webpage for the post.
 */
export default function PostFeed(props) {
    const {posts, subfolder} = props;

    return <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
        sx={{
            pl: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' },
            pr: { xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem' }
        }}
    >
        {posts.map((post) => {
            return <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={post[0]}>
                <MarkdownCard post={post} subfolder={subfolder}  />
            </Grid>
        })}
    </Grid>
}