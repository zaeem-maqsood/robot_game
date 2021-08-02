import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axios } from "../Axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const apiUrl = "scores/";
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setScores(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row className="pt-5">
        <Col>
          <h1>Leaderboard</h1>
          <Link to="/menu">
            <Button variant="warning">Back To Menu</Button>
          </Link>
        </Col>
      </Row>
      <Row className="pt-3">
        <Table striped hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => {
              return (
                <tr key={score.id}>
                  <td>{index + 1}</td>
                  <td>{score.username}</td>
                  <td>{score.score}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default Leaderboard;
