import * as React from "react";
import { range as _range, flatten as _flatten } from "lodash";
import * as gridDocument from "./../../utils/document.utils";
import { ICellCoordinate, ICell } from "./../../Interfaces/Cell.interface";
import Cell, { ICellWithEvents } from "../Cell/Cell";
import ActionHeader from "../ActionHeader/ActionHeader";
import { dikjistra } from "./../../Algorithms/dikjistra";
import "./grid.styles.scss";

const cells = (
  rows: number,
  columns: number,
  startCell: ICellCoordinate,
  endCell: ICellCoordinate
): ICell[][] => {
  return _range(0, rows).map((row) => {
    return _range(0, columns).map((column) => {
      let startNode = false;
      let endNode = false;
      if (startCell.row === row && startCell.column === column)
        startNode = true;
      if (endCell.row === row && endCell.column === column) endNode = true;
      return {
        row,
        column,
        distance: startNode ? 0 : Infinity,
        startNode,
        endNode,
        isVisited: false,
        wall: false,
        previousNode: null,
      };
    });
  });
};

const isBlocked = (targetNode: ICell): boolean => {
  return !targetNode.endNode;
};

const getShortedPathNodes = (foundDistanceNodes: ICell[]): ICell[] => {
  const targetNode: ICell = foundDistanceNodes.reverse()[0];
  if (isBlocked(targetNode)) return [];
  const shortestPathNodes: ICell[] = [];
  let currentNode = targetNode;
  while (currentNode.previousNode) {
    shortestPathNodes.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodes.reverse();
};

/**
 * @todo Fix multiple render on begining check with console
 * @todo write test
 */
const Grid: React.FC = () => {
  const { getTotalColumns, getTotalRows } = gridDocument;
  const rows = getTotalRows();
  const columns = getTotalColumns();
  const startNode: ICellCoordinate = { row: 2, column: 3 };
  const endNode: ICellCoordinate = { row: 3, column: 12 };

  const [nodes, setNodes] = React.useState<ICell[][]>();

  const [draw, setDraw] = React.useState<boolean>(false);

  React.useEffect(() => {
    const computedCells = cells(rows, columns, startNode, endNode);
    setNodes(computedCells);
  }, [rows, columns]);

  const cleanPreviousRunnedClass = (): void => {
    document
      .querySelectorAll(".node-visited")
      .forEach((x) => x.classList.remove("node-visited"));
    document
      .querySelectorAll(".node-shortest-path")
      .forEach((x) => x.classList.remove("node-shortest-path"));
  };

  const handleVisualize = async (
    e: React.MouseEvent<HTMLElement>,
    algorithm: Function
  ): Promise<void> => {
    e.preventDefault();
    cleanPreviousRunnedClass();
    const foundDistanceNodes = algorithm(_flatten(nodes));
    if (foundDistanceNodes && foundDistanceNodes.length) {
      const myPromises: Promise<string>[] = [];
      foundDistanceNodes.forEach((node: ICell, index: number) => {
        const el = document.querySelector(
          `[data-coordinate="${node.row}, ${node.column}"]`
        ) as Element;
        if (el) {
          myPromises.push(
            new Promise((resolve) => {
              setTimeout(() => {
                // !node.startNode &&
                  !node.endNode &&
                  el.classList.add("node-visited");
                resolve("resolved");
              }, 10 * index);
            })
          );
        }
      });

      await Promise.all(myPromises);

      /** Formulate shortest path */

      const shortestPathNodes: ICell[] = getShortedPathNodes(
        foundDistanceNodes
      );
      shortestPathNodes.forEach((node: ICell, index) => {
        const el = document.querySelector(
          `[data-coordinate="${node.row}, ${node.column}"]`
        ) as Element;
        if (el) {
          setTimeout(() => {
            // !node.startNode &&
            // !node.endNode &&
            el.classList.add("node-shortest-path");
          }, 30 * index);
        }
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setDraw(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (draw && nodes) {
      const { target } = e;
      const currentTarget: EventTarget = target;
      (currentTarget as HTMLElement).classList.add("grid-wall");
      const coordinate = (currentTarget as HTMLElement).getAttribute(
        "data-coordinate"
      ) as string;
      const [row, column] = coordinate.split(",");
      /** update the node with a wall true */
      const newRowNodes: ICell[] | undefined =
        nodes &&
        nodes[parseInt(row)].map((node: ICell) => {
          if (node.column === parseInt(column.trim())) {
            node.wall = true;
          }
          return node;
        });
      const updatedNodes: ICell[][] = nodes;
      updatedNodes[parseInt(row)] = newRowNodes;
      setNodes(updatedNodes);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    setDraw(false);
    console.log("stop drawing");
  };

  return (
    <>
      <ActionHeader onHandleClick={handleVisualize}/>
      <div id="layoutGrid">
        {/* <div style={{display : 'flex'}}>
        <button onClick={handleVisualize} className="gradient-btn">
          Visualize Dikjistra
        </button>
        <button onClick={toggle} className="gradient-btn">
          Toggle
        </button>
      </div> */}
        {nodes &&
          nodes.map((rowsWithCells: ICell[], index: number) => (
            <div
              className="row"
              key={index}
              style={
                {
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridAutoFlow: "column",
                } as React.CSSProperties
              }
            >
              {rowsWithCells.map((cell: ICell, index: number) => {
                const compositeObject = {
                  ...cell,
                  onHandleMouseDown: handleMouseDown,
                  onHandleMouseEnter: handleMouseEnter,
                  onHandleMouseUp: handleMouseUp,
                } as ICell & ICellWithEvents;
                return <Cell {...compositeObject} key={index} />;
              })}
            </div>
          ))}
      </div>
    </>
  );
};

export default Grid;
