import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
            justifyContnt='center'
            alignItems='center'
        >
            <Grid item xs={8}>
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'red'
                    }}
                />
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'green'
                    }}
                />
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'blue'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'red'
                    }}
                />
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'green'
                    }}
                />
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'blue'
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default Body;