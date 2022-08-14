import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
/**
 * 
 * This section is the footer. It
 * contains additional stuff of
 * hyperlinks to more experimental
 * pages or just random extra
 * info. IDK what to put, mostly
 * just copying the general page format
 * pattern of having a footer.
 * 
 * @param {*} props 
 */
function Footer(props) {

    return <Box component='footer' sx={{bgcolor: 'background.paper', py:6}}>
        <Container>
            <Typography variant='h6' align='center'>
                TODO: Add footer stuff.
            </Typography>
        </Container>
    </Box>
}

export default Footer;