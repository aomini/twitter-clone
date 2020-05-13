import * as React from "react";
import { ICell } from "./../../Interfaces/Cell.interface";

import StartIcon from "../Icons/StartIcon";
import EndIcon from "../Icons/TargetIcon";

import "./cell.styles.scss";

type MouseEvent = React.MouseEvent<HTMLDivElement>;

export interface ICellWithEvents {
  onHandleMouseDown: (e: MouseEvent) => void;
  onHandleMouseEnter: (e: MouseEvent) => void;
  onHandleMouseUp: (e: MouseEvent) => void;
}

const Cell: React.FC<ICell & ICellWithEvents> = ({
  row,
  column,
  startNode = false,
  endNode = false,
  ...events
}) => {
  return (
    <>
      <div
        className="cell"
        data-coordinate={`${row}, ${column}`}
        key={`${row}, ${column}`}
        onMouseDown={events.onHandleMouseDown}
        onMouseEnter={events.onHandleMouseEnter}
        onMouseUp={events.onHandleMouseUp}
      >
        {startNode && <StartIcon />}
        {endNode && <EndIcon />}
      </div>
    </>
  );
};
export default Cell;
