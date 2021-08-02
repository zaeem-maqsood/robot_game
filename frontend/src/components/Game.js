import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Board from "./Board";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { axios } from "../Axios";

function Game() {
  let history = useHistory();

  const [highestScore, setHighestScore] = useState(0);

  // State variable to keep track of the score
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Function to generate random numbers
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Define row and columns
  const rows = [0, 1, 2, 3, 4];
  const columns = [0, 1, 2, 3, 4];

  // Possible directions the roobot can travel in
  const directions = ["N", "E", "S", "W"];

  // State variable to keep track of the robot's direction
  const [direction, setDirection] = useState("N");

  // State variable to keep track of the robot's position
  const [robotPosition, setRobotPosition] = useState([2, 2]);

  // Generate a random spot on the board for the target
  let randomTargetPosition = [getRandomInt(5), getRandomInt(5)];

  // Make sure the randomly generated spot for the target is not the same as the robot's position
  while (_.isEqual(randomTargetPosition, robotPosition)) {
    randomTargetPosition = [getRandomInt(5), getRandomInt(5)];
  }

  // State variable to keep track of the target's position
  const [targetPosition, setTargetPosition] = useState(randomTargetPosition);

  // Icons
  const rotateLeftIcon = <FontAwesomeIcon icon={faUndo} />;
  const rotateRightIcon = <FontAwesomeIcon icon={faRedo} />;
  const arrowUpIcon = <FontAwesomeIcon icon={faArrowUp} />;

  // Set Timer
  const [time, setTime] = useState([60]);

  useEffect(() => {
    const apiUrl = "scores/current-highest-score";
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setHighestScore(response.data.highest_score);
      })
      .catch((err) => console.log(err));
  });

  // Re-render the page every second
  useEffect(() => {
    if (!gameOver) {
      let interval = setInterval(() => setTime((time) => time - 1), 1000);

      if (time === 0) {
        console.log("Time Ran out");
        setGameOver(true);
      }
      return () => clearInterval(interval);
    }
  }, [time, history, gameOver]);

  //   Function to handle right rotation of Robot
  const rotateRight = () => {
    const currentDirection = directions.findIndex((element) => {
      return element === direction;
    });

    if (currentDirection === 3) {
      setDirection(directions[0]);
    } else {
      setDirection(directions[currentDirection + 1]);
    }
  };

  // Function to handle left rotation of Robot
  const rotateLeft = () => {
    const currentDirection = directions.findIndex((element) => {
      return element === direction;
    });

    if (currentDirection === 0) {
      setDirection(directions[3]);
    } else {
      setDirection(directions[currentDirection - 1]);
    }
  };

  // Function to handle forward movement of Robot
  const moveForward = () => {
    if (direction === "N") {
      if (robotPosition[0] !== 0) {
        setRobotPosition([robotPosition[0] - 1, robotPosition[1]]);
      } else {
        setGameOver(true);
      }
    }

    if (direction === "E") {
      if (robotPosition[1] !== 4) {
        setRobotPosition([robotPosition[0], robotPosition[1] + 1]);
      } else {
        setGameOver(true);
      }
    }

    if (direction === "S") {
      if (robotPosition[0] !== 4) {
        setRobotPosition([robotPosition[0] + 1, robotPosition[1]]);
      } else {
        setGameOver(true);
      }
    }

    if (direction === "W") {
      if (robotPosition[1] !== 0) {
        setRobotPosition([robotPosition[0], robotPosition[1] - 1]);
      } else {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    console.log("Robot position is " + robotPosition);
    console.log("Target Position is " + targetPosition);

    if (_.isEqual(robotPosition, targetPosition)) {
      console.log("Got the Target!!");
      //   Get a spot on the board for the target
      let randomTargetPosition = [getRandomInt(5), getRandomInt(5)];

      //   Make sure the randomly generated spot for the target is not the same as the robot's position
      while (_.isEqual(randomTargetPosition, robotPosition)) {
        randomTargetPosition = [getRandomInt(5), getRandomInt(5)];
      }
      setTargetPosition(randomTargetPosition);

      setScore((score) => score + 1);
    }
  }, [robotPosition, targetPosition, setScore]);

  const handleNameSubmit = (e) => {
    e.preventDefault();

    if (name < 3 && name > 20) {
      setError(
        "Name must be contain at least 3 characters and less than 20 characters"
      );
    } else {
      console.log("Submit Name");
      setError("");
      const apiUrl = "scores/set-score";
      axios
        .post(apiUrl, {
          params: {
            username: name,
            score: score,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      history.push("/menu");
    }
  };

  if (gameOver) {
    return (
      <>
        <Form onSubmit={(e) => handleNameSubmit(e)}>
          <Row className="pt-5 text-center justify-content-center">
            <Col lg={4}>
              {score > highestScore ? <h1>New Highscore!</h1> : ""}
              <h3>Congratulations you scored {score} points</h3>
              <p>Record your name for be entered into the leaderboard.</p>
            </Col>
          </Row>
          <Row className="pt-3 justify-content-center">
            <Col lg={4}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  maxLength="20"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Text className="text-muted">Max Characters: 20</Form.Text>
                <p className="error">{error}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="pt-3 text-center justify-content-center">
            <Col lg={4}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
          <Row className="pt-3 text-center justify-content-center">
            <Col lg={4}>
              <Button
                variant="success"
                type="submit"
                onClick={(e) => {
                  setGameOver(false);
                  setScore(0);
                  setTime(60);
                }}
              >
                Play Again
              </Button>
            </Col>
          </Row>
          <Row className="pt-3 text-center justify-content-center">
            <Col lg={4}>
              <Button
                variant="warning"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/menu");
                }}
              >
                Menu
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Row className="pt-5 text-center">
          <Col>
            <h3>Score: {score}</h3>
          </Col>
          <Col>
            <h3>Time: {time}</h3>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <Board
              rows={rows}
              columns={columns}
              targetPosition={targetPosition}
              robotPosition={robotPosition}
              direction={direction}
            ></Board>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            <div className="d-grid gap-2">
              <Button onClick={rotateLeft} variant="primary">
                {rotateLeftIcon}
              </Button>
            </div>
          </Col>
          <Col>
            <div className="d-grid gap-2">
              <Button onClick={moveForward} variant="primary">
                {arrowUpIcon}
              </Button>
            </div>
          </Col>
          <Col>
            <div className="d-grid gap-2">
              <Button onClick={rotateRight} variant="primary">
                {rotateRightIcon}
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Game;
