import Grid from '@mui/material/Grid';
import BodyFeed from './body_feed';
import BodyBanner from './body_banner';

/**
 * This contains the main body
 * of the blog. It's broken down
 * into 2 main sections. The feed
 * of latest blog posts on the left
 * column, and a right smaller column
 * of things like Twitter posts or 
 * card elements of other stuff,
 * followed by a small section of 
 * hyperlinks to github, social
 * media, and linkdin.
 * 
 * Notes:
 * - Glob: https://www.npmjs.com/package/glob
 * - Reading Files: https://stackoverflow.com/questions/71540745/read-file-from-directory-reactjs
 * - React-markdown: https://www.npmjs.com/package/react-markdown
 * - Exact discussion on topic: https://stackoverflow.com/questions/69122134/how-to-display-markdown-files-in-nested-folders-in-next-js
 * 
 * @param {*} props 
 */
function Body(props) {
    return (
        <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='flex-start'
            spacing={3}
            sx={{ pl: 10, pr: 10 }}
        >
            <Grid item xs={8}>
                <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    spacing={2}
                >
                    <BodyFeed content={props.content} />
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <BodyBanner bannerContent={props.bannerContent} />
            </Grid>
        </Grid>
    );
}

export default Body;