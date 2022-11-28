import {useMemo} from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useWidth from './custom_hooks/useWidth';

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

    const width = useWidth();

    const navigation = useMemo(() => {

        switch (width) {
            case "xs":
            case "sm":
                const navLinks = [];

                let sectionInfo = sections[0]; // home
                navLinks.push(
                    <Button
                        color='inherit'
                        key={sectionInfo.title}
                        variant='text'
                        href={sectionInfo.url}
                        sx={{ flexShrink: 0, p: 2 }}
                    >
                        <Typography>
                            {sectionInfo.title}
                        </Typography>
                    </Button>
                );

                sectionInfo = sections[4]; // Search
                navLinks.push(
                    <Button
                        color='inherit'
                        key={sectionInfo.title}
                        variant='text'
                        href={sectionInfo.url}
                        sx={{ flexShrink: 0, p: 2 }}
                    >
                        <Typography>
                            {sectionInfo.title}
                        </Typography>
                    </Button>
                );

                sectionInfo = sections[5]; // Archive
                navLinks.push(
                    <Button
                        color='inherit'
                        key={sectionInfo.title}
                        variant='text'
                        href={sectionInfo.url}
                        sx={{ flexShrink: 0, p: 2 }}
                    >
                        <Typography>
                            {sectionInfo.title}
                        </Typography>
                    </Button>
                );

                return navLinks;
            case "md":
            case "lg":
            default:
                return sections.map((sectionInfo) => {
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
                });

        }

    }, [width, sections]);

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
                {navigation}
            </Toolbar>
        </Container>
    );
}

export default Header;