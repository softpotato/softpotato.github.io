import { Fragment } from "react";
import Typography from "@mui/material/Typography";

/**
 * This function renders text. It uses the Material UI
 * Typography to render it.
 * @param {string} componentID - the ID of the component
 * @param {string} type - a material ui typography type
 * @param {string} text - the main content to render
 * @returns 
 * 
 * https://stackoverflow.com/questions/52463765/typography-in-react-material-ui
 */
export default function Text({ type, text, children }) {

    return (
        <Fragment>
            <Typography
                variant={type}
                noWrap={false}
                sx={{ whiteSpace: 'pre-line'}}
                mb="1rem"
            >
                {text}
            </Typography>
            {children}
        </Fragment>
    );
}