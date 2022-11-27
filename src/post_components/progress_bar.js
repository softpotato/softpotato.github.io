import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fragment } from 'react';

export default function ProgressBar({ value, children }) {

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={value} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        value
                    )}%`}</Typography>
                </Box>
            </Box>
            {children}
        </Fragment>
    );
}