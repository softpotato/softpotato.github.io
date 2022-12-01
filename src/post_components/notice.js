import Alert from '@mui/material/Alert';
import { Fragment } from 'react';

export default function Notice({ severity, text, children }) {

    return (
        <Fragment>
            <Alert
                severity={severity}
            >
                {text}
                {children}
            </Alert>
        </Fragment>
    );
}