import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import animationData from "../Animation/robot";

function Menu() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Row className="pt-5 text-center">
        <Col>
          <Lottie options={defaultOptions} height={150} width={150} />
        </Col>
      </Row>
      <Row className="pt-5 text-center">
        <Col>
          <h1>ROBOT GAME</h1>
        </Col>
      </Row>
      <Row className="pt-3 text-center">
        <Col>
          <Link to="/game">
            <Button variant="primary">New Game</Button>
          </Link>
        </Col>
      </Row>
      <Row className="pt-3 text-center">
        <Col>
          <Link to="/leaderboard">
            <Button variant="success">Leader Board</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Menu;
