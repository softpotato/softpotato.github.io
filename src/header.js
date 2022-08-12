import * as React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

function Header(props) {
    const { title, contact, sections } = props;

    return (
        <React.Fragment>
            <Typography
                variant="h2"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >
                {title}
            </Typography>
            <Toolbar variant='dense' sx={{ justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                {contact.map((contactInfo) => {
                    return (<Typography variant='subtitle1' sx={{ p: 1, flexShrink: 0 }} key={contactInfo.value}>
                        {contactInfo.type + ": " + contactInfo.value}
                    </Typography>);
                })}
            </Toolbar>
            <Toolbar variant='dense' sx={{ justifyContent: 'center' }} component="nav">
                {sections.map((sectionInfo) => {
                    return (<Link
                        color='inherit'
                        noWrap
                        key={sectionInfo.title}
                        href={sectionInfo.url}
                        sx={{ flexShrink: 0, p: 2}}
                    >
                        <Typography>
                            {sectionInfo.title}
                        </Typography>
                    </Link>);
                })}
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;