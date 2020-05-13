import { ICell } from "./../Interfaces/Cell.interface";
import { cloneDeep as _deepClone } from "lodash";

export const updateNeighbouringNodes = (nodes: ICell[]): [] | ICell[] => {
  const currentNode = nodes[0];
  const updatedNodes = nodes.map((x: ICell) => {
    if (
      (x.row === currentNode.row - 1 &&
        x.column === currentNode.column &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row + 1 &&
        x.column === currentNode.column &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row &&
        x.column === currentNode.column - 1 &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row &&
        x.column === currentNode.column + 1 &&
        x.wall !== true &&
        !x.isVisited)
    ) {
      x.distance = currentNode.distance + 1;
      x.previousNode = currentNode;
    }
    return x;
  });
  return updatedNodes;
};

export const dikjistra = (nodes: ICell[]): Array<ICell> | void => {
  let unvisitedNodes = _deepClone(nodes);
  /* @todo throw if there's no ending node*/
  // const endingNode: ICellNodes = endNode(nodes);
  const visitedNodes = [];
  while (unvisitedNodes.length) {
    unvisitedNodes = unvisitedNodes.sort((a, b) => a.distance - b.distance);
    if (unvisitedNodes[0].distance === Infinity) return visitedNodes;
    const nodesWithUpdatedDistance = updateNeighbouringNodes(unvisitedNodes);
    nodesWithUpdatedDistance[0].isVisited = true;
    visitedNodes.push(nodesWithUpdatedDistance[0]);
    if (nodesWithUpdatedDistance[0].endNode) {
      break;
    }
    unvisitedNodes = nodesWithUpdatedDistance.filter(
      (x: ICell) => !x.isVisited
    );
  }
  return visitedNodes;
};
