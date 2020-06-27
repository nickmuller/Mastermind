import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}
