import { ICell } from "../Interfaces/Cell.interface";

/**
 * Get diagonal neighbours
 * Since it's a non weighted no need to updated the distances but it marks as them visited
 * @param currentNode
 * @param nodes updated all nodes
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
    if (
      (x.row === currentNode.row - 1 &&
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
    ) {
      x.previousNode = currentNode;
      x.isVisited = true;
    }
    return x;
  });
  return updatedNodes;
};

/**
 * Get diagonal neighbours with non discovery
 * Since it's a non weighted no need to updated the distances
 * @param currentNode
 * @param nodes only neighbouring nodes
 */
export const nonWeightedAllNeighbours = <T extends ICell>(
  currentNode: T,
  nodes: T[]
): T[] => {
  const updatedNodes: T[] = nodes.filter((x: T) => {
    return (
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
        !x.isVisited) ||
      /** Following conditions are for diagonal neighbours */
      (x.row === currentNode.row - 1 &&
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
    );
  });
  return updatedNodes;
};
