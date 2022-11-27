import Typography from "@mui/material/Typography";
import { Component, Fragment } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorType: "",
            errorInfo: "",
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorType: error,
            errorInfo: info
        });
    }

    render() {
        
        if (this.hasError) {
            return <Fragment>
                <Typography variant="h3" sx={{color: "red"}}>An Error Has Occurred</Typography>
                <Typography variant="body1">{this.errorType}</Typography>
                <Typography variant="subtitle1">{this.errorInfo}</Typography>
            </Fragment>
        }

        return this.children;

    }
}