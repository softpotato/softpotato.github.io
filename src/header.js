import * as React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
//import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
//import Box from '@mui/material/Box';

function Header(props) {
    const { title, sections } = props;

    return (
        <React.Fragment>
            <AppBar position='static'>
                <Toolbar variant='dense' sx={{ justifyContent: 'flex-start' }} component="nav">
                    {sections.map((sectionInfo) => {
                        return (<Button
                            color='inherit'
                            noWrap
                            key={sectionInfo.title}
                            href={sectionInfo.url}
                            sx={{ flexShrink: 0, p: 2 }}
                        >
                            <Typography>
                                {sectionInfo.title}
                            </Typography>
                        </Button>);
                    })}
                </Toolbar>
            </AppBar>
            <Typography
                variant="h2"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >
                {title}
            </Typography>
        </React.Fragment>
    );
}

export default Header;