import * as React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function Header(props) {
    const { title, sections } = props;

    return (
        <React.Fragment>
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
                        noWrap
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
        </React.Fragment>
    );
}

export default Header;