import * as React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

/**
 * This component acts as the header. It
 * renders a centered title and a list
 * of hyperlinks below to redirect the user
 * around.
 * 
 * @param {*} props 
 * @returns 
 */
function Header(props) {
    const { title, sections } = props;

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h2"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1, mt: 5 }}
            >
                {title}
            </Typography>
            <Toolbar variant='dense' sx={{ justifyContent: 'center' }} component="nav">
                {sections.map((sectionInfo) => {
                    return (<Button
                        color='inherit'
                        key={sectionInfo.title}
                        variant='text'
                        href={sectionInfo.url}
                        sx={{ flexShrink: 0, p: 2 }}
                    >
                        <Typography>
                            {sectionInfo.title}
                        </Typography>
                    </Button>);
                })}
            </Toolbar>
        </Container>
    );
}

export default Header;