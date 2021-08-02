import React from "react";
import Table from "react-bootstrap/Table";

import Square from "./Square";

function Board(props) {
  const { rows, columns, robotPosition, targetPosition, direction } = props;

  return (
    <>
      <Table bordered className="board">
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                {columns.map((column, j) => {
                  return (
                    <Square
                      key={j}
                      rowPosition={i}
                      columnPosition={j}
                      robotPosition={robotPosition}
                      targetPosition={targetPosition}
                      direction={direction}
                    ></Square>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Board;
