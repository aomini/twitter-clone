import { cloneDeep as _deepClone, find as _find } from "lodash";
import { ICell } from "./../Interfaces/Cell.interface";
import { Queue } from "../DataStructure/Queue";
import { startNode, endNode } from "./helpers";

/**
 * Get diagonal neighbours 
 * Since it's a non weighted no need to updated the distances 
 * @param currentNode 
 * @param nodes 
 */
export const getNonWeightedDiagonalNeighbours = <T extends ICell>(
  currentNode: T,
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
      x.previousNode = currentNode;
      x.isVisited = true;
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
      x.previousNode = currentNode; 
      x.isVisited = true;
    }
    return x;
  });
  return updatedNodes;
};

/**
 * It is an unweighted graph but guarentees the shortest path (also greedy BFS exists as well)
 * @reference https://en.wikipedia.org/wiki/Breadth-first_search
 * @param nodes 
 */
export const BFS = (nodes: ICell[]) : ICell[] | void => {

    let unvisitedNodes = _deepClone(nodes);
    const visited = []
    const queue = new Queue<ICell>();
    const initialNode  = startNode(nodes) as ICell;
    const goalNode = endNode(nodes)
    if(typeof goalNode === "undefined") return [];

    initialNode.isVisited = true;
    queue.enqueue(initialNode)
    while(!queue.isEmpty()){
        const current = queue.dequeue() as ICell;
        visited.push(current);
        if(current && current.endNode) return visited;

        const nodesWithUpdatedNeighbours = getNonWeightedDiagonalNeighbours(
            current,
            unvisitedNodes
        );
        unvisitedNodes = nodesWithUpdatedNeighbours.filter(x=> !x.isVisited);
        nodesWithUpdatedNeighbours.filter(x => x.isVisited).forEach(x => queue.enqueue(x))
    }
}