import React, { Component } from "react";
import { Container, Row, Button, Alert } from "react-bootstrap";
import { Pin } from "./Pin";
import { Score, ScoreColor } from "./Score";
import { ErrorComponent } from "./Error";
import { Client, Colour } from "../api/Client";
import { Fab } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

function ColourKey(colour: Colour) {
    return colour === Colour.Black ? 1
        : colour === Colour.Blue ? 2
        : colour === Colour.Green ? 3
        : colour === Colour.Red ? 4
        : colour === Colour.Yellow ? 5
        : 6;
}

function KeyColour(key: string) {
    return key === "1" ? Colour.Black
        : key === "2" ? Colour.Blue
        : key === "3" ? Colour.Green
        : key === "4" ? Colour.Red
        : key === "5" ? Colour.Yellow
        : Colour.White;
}

interface Props {
}

interface State {
    guid?: string;
    activeRow: number;
    activePin: number;
    masterRowColours: (Colour | null)[];
    colours: (Colour | null)[];
    scores: (ScoreColor | null)[];
    gameOver: boolean;
    won: boolean;
    lost: boolean;
    error: any;
}

export class Game extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = this.defaultState;
        this.checkClick = this.checkClick.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
    }

    defaultState = {
        guid: "",
        activeRow: 1,
        activePin: 1,
        masterRowColours: new Array(4 * 1).fill(null),
        colours: new Array(4 * 10).fill(null),
        scores: new Array(4 * 10).fill(null),
        gameOver: false,
        won: false,
        lost: false,
        error: null
    };

    handleErrorResponse(err: any) {
        this.setState({ error: err });
        console.log(err);
    }

    componentDidMount() {
        this.startNewGame();
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    startNewGame() {
        this.setState({ ...this.defaultState });

        const client = new Client();
        client.startNewGame()
            .then(data => this.setState({ guid: data }))
            .catch(this.handleErrorResponse);
    }

    onKeyDown = (ev: KeyboardEvent) => {
        if (this.state.gameOver)
            return;

        if ((ev.keyCode >= 49 && ev.keyCode <= 54) || (ev.keyCode >= 97 && ev.keyCode <= 102)) {
            const colour = KeyColour(ev.key);
            this.changeColour(null, colour);
        } else if (ev.key === "Enter") {
            this.checkClick(null);
        } else if (ev.key === "Escape") {
            this.changeColour(null, null);
        }
    }

    changeColour = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, colour: Colour | null): any => {
        if (e != null)
            e.preventDefault();

        const colours = [...this.state.colours];
        const index = (this.state.activeRow - 1) * 4 + this.state.activePin - 1;
        colours[index] = colour;
        this.setState({ colours, activePin: this.state.activePin % 4 + 1 });
    };

    setPinIndex = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number): any => {
        e.preventDefault();
        this.setState({ activePin: i % 4 + 1 });
    };

    checkClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null): any => {
        if (e != null)
            e.preventDefault();

        const colourStartIndex = (this.state.activeRow - 1) * 4;
        var colours = this.state.colours.slice(colourStartIndex, colourStartIndex + 4);

        if (colours.includes(null)) {
            alert("kies eerst 4 kleuren");
            return;
        }

        const client = new Client();
        client.nextTry(this.state.guid, colours as Array<Colour>)
            .then(score => {

                // 4 scores weergeven op volgorde van: zwarte, wit, leeg
                const scoreResults = [
                    ...Array(score.same).fill(ScoreColor.Black),
                    ...Array(score.sameColour).fill(ScoreColor.White),
                    ...Array(4 - (score.same || 0) - (score.sameColour || 0))
                ];

                const scores = [...this.state.scores];
                const scoreStartIndex = (this.state.activeRow - 1) * 4;
                [scores[scoreStartIndex],
                    scores[scoreStartIndex + 1],
                    scores[scoreStartIndex + 2],
                    scores[scoreStartIndex + 3]] = scoreResults;
                
                this.setState({
                    scores: scores,
                    activeRow: this.state.activeRow + 1,
                    activePin: 1
                });

                if (score.same === 4) {
                    this.setState({ gameOver: true, won: true });
                    this.showMasterRow();
                }
                else if (this.state.activeRow > 10) {
                    this.setState({ gameOver: true, lost: true });
                    this.showMasterRow();
                }
            })
            .catch(this.handleErrorResponse);
    };

    showMasterRow() {
        const client = new Client();
        client.masterRow(this.state.guid)
            .then(row => {
                const masterRowColours = [...this.state.masterRowColours];
                for (var i = 1; i <= 4; i++) {
                    masterRowColours[i - 1] = row.pins!.find(p => (p.position || 0) === i)!.colour || null;
                }
                this.setState({ masterRowColours: masterRowColours });
            })
            .catch(this.handleErrorResponse);
    }

    renderRow(i: number) {
        const pinStartIndex = (i - 1) * 4;
        const scoreStartIndex = (i - 1) * 4;
        const rowIsActive = this.state.activeRow === i;

        return (
            <Row>
                <Pin colour={this.state.colours[pinStartIndex]} onClick={(e) => this.setPinIndex(e, pinStartIndex)} active={rowIsActive && this.state.activePin === 1} />
                <Pin colour={this.state.colours[pinStartIndex + 1]} onClick={(e) => this.setPinIndex(e, pinStartIndex + 1)} active={rowIsActive && this.state.activePin === 2} />
                <Pin colour={this.state.colours[pinStartIndex + 2]} onClick={(e) => this.setPinIndex(e, pinStartIndex + 2)} active={rowIsActive && this.state.activePin === 3} />
                <Pin colour={this.state.colours[pinStartIndex + 3]} onClick={(e) => this.setPinIndex(e, pinStartIndex + 3)} active={rowIsActive && this.state.activePin === 4} />

                <div className="scores">
                    <Score color={this.state.scores[scoreStartIndex]} />
                    <Score color={this.state.scores[scoreStartIndex + 1]} /><br />
                    <Score color={this.state.scores[scoreStartIndex + 2]} />
                    <Score color={this.state.scores[scoreStartIndex + 3]} />
                </div>
            </Row>
        );
    }

    renderColorButton(colour: Colour) {
        return (
            <Fab size="small" className={["colorbutton", colour].join(" ")} onClick={(e) => this.changeColour(e, colour)} disabled={this.state.gameOver}>
                {ColourKey(colour)}
            </Fab>
        );
    }

    render() {
        return (
            <React.Fragment>
                <ErrorComponent error={this.state.error} />
                <div id="game" data-guid={this.state.guid} className="p-5">
                    <div className="d-flex">
                        <div className="flex-column">
                            <Container>
                                <ChevronRight className={["activerowicon", "r" + this.state.activeRow].join(" ")} />
                                {this.renderRow(1)}
                                {this.renderRow(2)}
                                {this.renderRow(3)}
                                {this.renderRow(4)}
                                {this.renderRow(5)}
                                {this.renderRow(6)}
                                {this.renderRow(7)}
                                {this.renderRow(8)}
                                {this.renderRow(9)}
                                {this.renderRow(10)}

                                <Row id="masterrow">
                                    <Pin colour={this.state.masterRowColours[0]} disabled />
                                    <Pin colour={this.state.masterRowColours[1]} disabled />
                                    <Pin colour={this.state.masterRowColours[2]} disabled />
                                    <Pin colour={this.state.masterRowColours[3]} disabled />
                                </Row>
                            </Container>
                        </div>
                        <div className="flex-column text-center">
                            {this.renderColorButton(Colour.Black)}<br />
                            {this.renderColorButton(Colour.Blue)}<br />
                            {this.renderColorButton(Colour.Green)}<br />
                            {this.renderColorButton(Colour.Red)}<br />
                            {this.renderColorButton(Colour.Yellow)}<br />
                            {this.renderColorButton(Colour.White)}<br />

                            <Button variant="primary" className="m-2" disabled={this.state.gameOver} onClick={this.checkClick}>
                                Check
                            </Button>
                        </div>
                    </div>
                </div>

                {this.state.won ? (
                    <Alert variant="success">
                        <Alert.Heading>Nice!</Alert.Heading>
                        <p>
                            Je hebt gewonnen!
                        </p>
                        <Button variant="success" onClick={() => this.startNewGame()}>Start nieuw spel</Button>
                    </Alert>
                ) : null}
                {this.state.lost ? (
                    <Alert variant="dark">
                        <Alert.Heading>Shit!</Alert.Heading>
                        <p>
                            Je hebt verloren...
                        </p>
                        <Button variant="dark" onClick={() => this.startNewGame()}>Start nieuw spel</Button>
                    </Alert>
                ) : null}
            </React.Fragment>
        );
    }
}