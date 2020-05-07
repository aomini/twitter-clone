import { cloneDeep as _deepClone, find as _find } from "lodash";
import { ICell } from "../Interfaces/Cell.interface";
import { startNode, endNode } from "./helpers";

/**
 * Calculates the hcost i.e distance from end node using diagonal heuristics
 * @reference http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#a-stars-use-of-the-heuristic
 * @var D Estimated distance scale
 * @var D2 diagonally (use pytharus theorem if distance is 1 then root of 1sq + 1sq) Is mutiplied by Scale distance D to get non floating number
 * @param node
 * @param endNode
 * @returns {number}
 */
function hcost(node: ICell, endNode: ICell): number {
  const D = 10;
  const D2 = 1.4 * D;
  const dc = Math.abs(node.column - endNode.column);
  const dr = Math.abs(node.row - endNode.row);
  return D * (dc + dr) + (D2 - 2 * D) * Math.min(dc, dr);
}

/**
 * Updates the neighbourers of the current node
 * First updates the four direction nodes (top, bottom, left & right)
 * Secondly checks and updates the diagonal nodes (left-top , left-bottom, right-top & right-bottom)
 * @todo refactor manhattan distance is same as dikjistra logic
 * @param {T} currentNode 
 * @param {T} nodes
 * @returns {T[]}
 */
export const getDiagonalNeighbours = <T extends ICell>(
  currentNode: T,
  goalNode: T,
  nodes: T[]
): T[] => {
  const updatedNodes: T[] = nodes.map((x: T) => {
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
      /** Asuming the distance between the nodes are 10 */
      x.distance = currentNode.distance + 10;
      x.hcost = hcost(x, goalNode);
      x.previousNode = currentNode;
    }
    /** Following conditions are for diagonal neighbours */
    if((x.row === currentNode.row - 1 &&
        x.column === currentNode.column - 1 &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row + 1 &&
        x.column === currentNode.column - 1 &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row - 1 &&
        x.column === currentNode.column + 1 &&
        x.wall !== true &&
        !x.isVisited) ||
      (x.row === currentNode.row + 1 &&
        x.column === currentNode.column + 1 &&
        x.wall !== true &&
        !x.isVisited)
    ){
     /** Assuming the distance between the nodes are 10. we used pythagorus theorem to get 14 on diagonal distance*/
      x.distance = currentNode.distance + 14;
      x.hcost = hcost(x, goalNode);
      x.previousNode = currentNode; 
    }
    return x;
  });
  return updatedNodes;
};

/**
 * Algorithm:
 * 1. Loop unless something is unvisitedNodes are none i.e all the nodes are visited & not opened.
 * 2. Sort by distance. initial distance of starting point is 0 so it comes at top on first.
 * 3.
 * @param nodes
 *
 *
 */
export const aStar = (nodes: ICell[]): ICell[] | void => {
  const goalNode  = endNode(nodes) as ICell;
  if(!Object.keys(goalNode).length){
    return [] as ICell[];
  }
  const startingNode = startNode(nodes) as ICell;
  startingNode.hcost = 0;

  let unvisitedNodes = _deepClone(nodes);
  const visitedNodes = [];
  
  let current = startingNode;

  while (unvisitedNodes.length) {    
    const nodesWithUpdatedNeighbours = getDiagonalNeighbours(
      current,
      goalNode,
      unvisitedNodes
    );
    
    if (current.endNode) {
      visitedNodes.push(current);
      return visitedNodes;
    }
    // nodesWithUpdatedNeighbours[0].isVisited = true;
    // visitedNodes.push(nodesWithUpdatedNeighbours[0])
    unvisitedNodes = nodesWithUpdatedNeighbours.sort((a, b) => a.hcost - b.hcost);
    unvisitedNodes[0].isVisited = true;
    current = unvisitedNodes[0];
    visitedNodes.push(current);    
    unvisitedNodes = nodesWithUpdatedNeighbours.sort((a, b) => a.hcost - b.hcost).filter((x) => !x.isVisited)
  }
  // console.log(visitedNodes);
  // return visitedNodes;
};
