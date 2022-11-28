import { useContext } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SettingContext } from './app';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LANGUAGES } from './app';
import MenuItem from '@mui/material/MenuItem';
import ThemeSwitch from './theme_switch';
import Grid from '@mui/material/Grid';

/**
 * 
 * This section is the footer. The footer is a place
 * where users will go if they can't find what they
 * want up top. Usually, this is for navigation. However,
 * I'm mostly just hiding terms of agreement or stuff like
 * that here. I'm also going to stick the theme toggle 
 * and the langauge drop down here.
 * 
 * There is no passed down props here. This solely relies
 * on the useContext hook to pass down information.
 * 
 * If you're worried about copying my code. I mostly added
 * the copy right sign mostly cause I saw it on an example
 * online. I will not pursue any legal actions at all. I don't
 * even have any cash to do so.
 */
function Footer({ pageID }) {
    const { language, changeLanguage } = useContext(SettingContext);

    const handleChange = (event) => {
        changeLanguage(event.target.value);
    }

    return (
        <Grid container sx={{ bgcolor: 'background.paper', py: 6, display: "flex", flexDirection: "row" }}>
            <Grid item xs={12} sm={9} md={9} lg={9} >
                <Container sx={{ flexGrow: "2" }}>
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
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
                <Container sx={{ flexShrink: "1" }}>
                    <ThemeSwitch />
                    <InputLabel id={pageID + "-footer-select-label"}>{language["footer-language-label"]}</InputLabel>
                    <Select
                        labelId={pageID + "-footer-select-label"}
                        id={pageID + "-footer-select"}
                        label={language["footer-language-label"]}
                        onChange={handleChange}
                        value={language['language']}
                        size="small"
                    >
                        {Object.keys(LANGUAGES).map((key) => {
                            return <MenuItem key={pageID + "-" + LANGUAGES[key]} value={LANGUAGES[key]}>{LANGUAGES[key]}</MenuItem>;
                        })}
                    </Select>
                </Container>
            </Grid>
        </Grid>
    );


    // <Box component='footer' sx={{ bgcolor: 'background.paper', py: 6, display: "flex", flexDirection: "row" }}>
    // </Box>
}

export default Footer;