import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { SettingContext } from "./app";
import FormControlLabel from "@mui/material/FormControlLabel";

/**
 * This is a theme switch. It is used to
 * display a simple toggle between light
 * and dark mode. 
 * 
 * You can upgrade this to handle more themes,
 * but unless you're making an interface
 * someone will use over and over again
 * and store information on, there is
 * no point in personalizing this theme
 * switch other than for accessbility purposes.
 * 
 * E.g. I have a friend who has eyesight 
 * problems and can't use dark mode, most
 * likely due to issues with contrast in
 * dark mode. Dark mode is prefered for 
 * some people, like me. 
 * 
 * TODO: https://mui.com/material-ui/customization/how-to-customize/
 */
export default function ThemeSwitch() {
    const { mode, toggleColorMode, language } = useContext(SettingContext);

    return <FormControlLabel control={<Switch
        checked={mode === 'light'}
        onChange={toggleColorMode}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{

        }} />}
        label={language["theme"]}
    />
}