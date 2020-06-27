import React from 'react';
import { Container, Card, Dropdown, Col, Row, Button } from 'react-bootstrap';
import { Game } from '../components/Game';
import Instructions from '../components/Instructions';

export default function Home() {
    return (
        <React.Fragment>
            <Container>
                <main>
                    <h1>Mastermind</h1>
                    <Row>
                        <Col md="auto">
                            <Game />
                        </Col>
                        <Col>
                            <Instructions />
                        </Col>
                    </Row>
                </main>
            </Container>
        </React.Fragment>
    );
}