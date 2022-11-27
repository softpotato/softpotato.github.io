import { Fragment } from "react"

export default function Space({ children }) {

    return (
        <Fragment>
            <div />
            {children}
        </Fragment>
    );
}