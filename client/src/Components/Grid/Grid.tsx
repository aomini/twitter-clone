import * as React from "react";
import "./grid.styles.scss";
import TargetIcon from "../Icons/TargetIcon";
import StartIcon from "../Icons/StartIcon";

type CellCoordinate = {
    row : number,
    column : number
}

const getTotalColumns = (): number => {
  return Math.floor(window.innerHeight / 10);
};

const getTotalRows = (): number => {
  return Math.floor(window.innerWidth / 50);
};

/** Nodes utils */
type Node = CellCoordinate;
const closestNodes = (currentNode : Node): void => {
    console.log(currentNode)
}

/**
 * @todo make component of cell & use higher order comonents for icon & also refactor the icon
 * @todo Fix multiple render on begining check with console
 * @todo make target component and start component higher order components
 * @todo write test
 */
const Grid: React.FC = () => {
  const [rows] = React.useState<number>(getTotalRows());
  const [columns] = React.useState<number>(getTotalColumns());
  const [startCell] = React.useState<CellCoordinate>({
    row: 5,
    column: 1
  })

  const [targetCell] = React.useState<CellCoordinate>({
    row: 4,
    column: 10
  })

  closestNodes(startCell)

  return (
    <div id="layoutGrid">
      {[...Array(rows).keys()].map((row) => (
        <div
          className="row"
          key={row}
          style={
            {
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            } as React.CSSProperties
          }
        >
          {[...Array(columns).keys()].map((column) => (
            <div
              className="cell"
              data-coordinate={`${row}, ${column}`}
              key={`${row}, ${column}`}
            >
                {startCell.row === row && startCell.column === column && <StartIcon/>}
                {targetCell.row === row && targetCell.column === column && <TargetIcon/>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
