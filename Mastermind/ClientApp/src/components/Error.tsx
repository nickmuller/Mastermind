import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { ApiException } from "../api/Client";

export interface Props {
    error: any
}

export class ErrorComponent extends Component<Props> {
    render() {
        const error = this.props.error;

        if (!error) {
            return null;
        }

        return (
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                {error instanceof ApiException ? (
                    <React.Fragment>
                        <p>
                            {error.status} {error.message}
                        </p>
                        <pre>
                            {error.response}
                        </pre>
                    </React.Fragment>
                ) : error instanceof window.Response ? (
                    <React.Fragment>
                        <p>
                            {error.status} {error.statusText}
                        </p>
                    </React.Fragment>
                ) : (
                    <p>
                        <code>{error.toString()}</code>
                    </p>
                )}
            </Alert>
        );
    }
}