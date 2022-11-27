import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function Image({ src, alt, caption, children }) {

    return (
        <Fragment>
            <img
                className="static-image"
                src={src}
                alt={alt}
            />
            <div />
            {caption && <Typography
                variant="caption"
                noWrap={false}
                mb="2rem"
            >
                {caption}
            </Typography>}
            {children}
        </Fragment>
    );
}