import React from "react";

export enum ScoreColor {
    Black = "black",
    White = "white",
}

export interface Props {
    color: ScoreColor | null;
}

interface State {
}

export class Score extends React.Component<Props, State> {
    render() {
        return (
            <div className={["score", this.props.color].join(" ")}></div>
        );
    }
}