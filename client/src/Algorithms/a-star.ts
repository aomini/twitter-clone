import { cloneDeep as _deepClone, find as _find } from "lodash";
import { ICell } from "../Interfaces/Cell.interface";
import { startNode, endNode } from "./helpers";

type ICellHeuristic = ICell & {hcost: number}

/**
 * Calculates the hcost i.e distance from end node using diagonal heuristics
 * @reference http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#a-stars-use-of-the-heuristic
 * @var D Estimated distance scale
 * @var D2 diagonally (use pytharus theorem if distance is 1 then root of 1sq + 1sq) Is mutiplied by Scale distance D to get non floating number
 * @param node
 * @param endNode
 * @return number
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
 * @param currentNode
 * @param nodes
 */
export const getDiagonalNeighbours = <T extends ICell & { hcost: number }>(
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
  const goalNode  = endNode(nodes) as ICellHeuristic;
  const startingNode = startNode(nodes) as ICellHeuristic;
  startingNode.hcost = 0;

  let unvisitedNodes = _deepClone(nodes);
  const visitedNodes = [];
  
  let current = startingNode;

  let count = 4;
  while (unvisitedNodes.length) {
    // count++;
    
    const nodesWithUpdatedNeighbours = getDiagonalNeighbours<
      ICell & { hcost: number }
    >(
      current as ICell & { hcost: number },
      goalNode as ICell & { hcost: number },
      unvisitedNodes as Array<ICell & { hcost: number }>
    );
    // console.log("updated nodes are");
    // console.log(
    //   nodesWithUpdatedNeighbours.sort((a, b) => a.distance - b.distance)
    // );
    // visitedNodes.push({ ...current, isVisited: true });
    if (current.endNode) {
      visitedNodes.push(current);
      console.log(visitedNodes)
      return visitedNodes;
    }
    nodesWithUpdatedNeighbours[0].isVisited = true;
    visitedNodes.push(nodesWithUpdatedNeighbours[0])
    unvisitedNodes = nodesWithUpdatedNeighbours.filter((x) => !x.isVisited).sort((a, b) => a.hcost - b.hcost);
    current = unvisitedNodes[0] as ICellHeuristic;
  }
  console.log(visitedNodes);
  return visitedNodes;
};
