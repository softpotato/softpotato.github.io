import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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

    return <Box component='footer' sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container>
            <Typography variant='subtitle2' color='text.secondary' align='center'>
                This site records visitation. No other information is collected outside of github.
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://softpotato.github.io/">
                    Benjamin Lin
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    </Box>
}

export default Footer;