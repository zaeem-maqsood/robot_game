import React from "react";
import _ from "lodash";
import robot from "../robot.png";
import target from "../target.png";

import Image from "react-bootstrap/Image";

function Square(props) {
  const {
    rowPosition,
    columnPosition,
    robotPosition,
    targetPosition,
    direction,
  } = props;

  const currentPosition = [rowPosition, columnPosition];
  let className = "robot";

  if (direction === "N") {
    className += " up";
  } else if (direction === "E") {
    className += " right";
  } else if (direction === "W") {
    className += " left";
  } else {
  }

  let robotImage = <Image src={robot} className={className}></Image>;

  if (_.isEqual(robotPosition, currentPosition)) {
    return (
      <>
        <td className="board-cell">{robotImage}</td>
      </>
    );
  } else if (_.isEqual(targetPosition, currentPosition)) {
    return (
      <>
        <td className="board-cell">
          <Image src={target} className="target" />
        </td>
      </>
    );
  } else {
    return (
      <>
        <td className="board-cell"></td>
      </>
    );
  }
}

export default Square;
