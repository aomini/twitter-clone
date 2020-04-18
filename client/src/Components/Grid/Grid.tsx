import * as React from "react";
import { range as _range, flatten as _flatten } from "lodash";
import * as gridDocument from "./../../utils/document.utils";
import { ICellCoordinate, ICell } from "./../../Interfaces/Cell.interface";
import Cell from "../Cell/Cell";

import {dikjistra} from './../../Algorithms/dikjistra'

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
      if (startCell.row === row && startCell.column === column) startNode = true;
      if (endCell.row === row && endCell.column === column) endNode = true;
      return {
        row,
        column,
        distance: startNode ? 0 : Infinity,
        startNode,
        endNode,
        isVisited : false,
        previousNode : null
      };
    });
  });
};

/**
 * @todo Fix multiple render on begining check with console
 * @todo write test
 */
const Grid: React.FC = () => {
  const { getTotalColumns, getTotalRows } = gridDocument;
  const rows = getTotalRows();
  const columns = getTotalColumns();
  const startNode : ICellCoordinate = {row : 10, column: 15};
  const endNode : ICellCoordinate = {row : 18, column: 35};

  const [nodes, setNodes] = React.useState<ICell[][]>();

  React.useEffect(() => {
    const computedCells = cells(rows, columns, startNode, endNode);
    setNodes(computedCells);    
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVisualize = async (e : React.FormEvent<HTMLButtonElement>) : Promise<string> => {
    e.preventDefault();
    const foundDistanceNodes = dikjistra(_flatten(nodes));
   
    if(foundDistanceNodes && foundDistanceNodes.length){
        const myPromises : any[] = [];
        foundDistanceNodes.forEach((node : ICell, index) => {
          const el : any = document.querySelector(`[data-coordinate="${node.row}, ${node.column}"]`)
          if(el) {
            myPromises.push(new Promise(resolve => {
                setTimeout(() => {
                  !node.startNode && !node.endNode && (el.classList.add("node-visited"))
                  resolve();
                }, 10 * index)
            }));
          }
        });
      await Promise.all(myPromises);     

      /** Formulate shortest path */
      const targetNode = foundDistanceNodes.reverse()[0];   

      const shortestPathNodes = [];
      let currentNode = targetNode;
      while(currentNode.previousNode){
        shortestPathNodes.push(currentNode);
        currentNode = currentNode.previousNode;
      }

      shortestPathNodes.reverse().forEach((node : ICell, index) => {
        const el : any = document.querySelector(`[data-coordinate="${node.row}, ${node.column}"]`)
        if(el) {
          setTimeout(() => {
            !node.startNode && !node.endNode && (el.classList.add("node-shortest-path"));
          }, 30 * index)
        }
      });
    }
    return "done";
  }

  return (
    <div id="layoutGrid">
      <button onClick={handleVisualize} className="gradient-btn">Visualize Dikjistra</button>
      {nodes &&
        nodes.map((rowsWithCells: ICell[], index: number) => (
          <div
            className="row"
            key={index}
            style={
              {
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              } as React.CSSProperties
            }
          >
            {rowsWithCells.map((cell: ICell, index : number) => (
              <Cell {...cell} key={index} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;
