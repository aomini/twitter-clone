import * as React from "react";
import {ICell} from "./../../Interfaces/Cell.interface";

import StartIcon from "../Icons/StartIcon";
import EndIcon from "../Icons/TargetIcon";

import "./cell.styles.scss";

const Cell: React.FC<ICell> = ({row, column, startNode = false, endNode = false}) => {
  return (
    <>
      <div
        className="cell"
        data-coordinate={`${row}, ${column}`}
        key={`${row}, ${column}`}
      >
        {startNode && <StartIcon/>}
        {endNode && <EndIcon/>}
      </div>
    </>
  );
};
export default Cell;
