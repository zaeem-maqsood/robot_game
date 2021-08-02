import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Menu from "./components/Menu";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard></Leaderboard>
            </Route>
            <Route path="/game">
              <Game></Game>
            </Route>
            <Route path="/">
              <Menu></Menu>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
