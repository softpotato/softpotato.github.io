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
            spacing={{xs: 1, sm: 1, md: 1, lg: 2, xl: 3}}
            sx={{ pl: {xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem'}, pr: {xs: '1rem', sm: '1rem', md: '1rem', lg: '5rem', xl: '5rem'} }}
        >
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    spacing={2}
                >
                    <BodyFeed content={props.content} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <BodyBanner bannerContent={props.bannerContent} />
            </Grid>
        </Grid>
    );
}

export default Body;