import { useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SettingContext } from './app';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LANGUAGES } from './app';
import MenuItem from '@mui/material/MenuItem';

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
    const { mode, toggleColorMode, language, changeLanguage } = useContext(SettingContext);

    const handleChange = (event) => {
        changeLanguage(event.target.value);
    }

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
            <Switch checked={mode === 'light'} onChange={toggleColorMode} inputProps={{ 'aria-label': 'controlled' }} />
            <InputLabel id={pageID + "-footer-select-label"}>{language["footer-language-label"]}</InputLabel>
            <Select
                labelId={pageID + "-footer-select-label"}
                id={pageID + "-footer-select"}
                label={language["footer-language-label"]}
                onChange={handleChange}
                value={language['language']}
            >
                {Object.keys(LANGUAGES).map((key) => {
                    return <MenuItem key={pageID + "-" + LANGUAGES[key]} value={LANGUAGES[key]}>{LANGUAGES[key]}</MenuItem>;
                })}
            </Select>
        </Container>
    </Box>
}

export default Footer;