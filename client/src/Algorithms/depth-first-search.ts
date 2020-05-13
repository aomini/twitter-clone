import { cloneDeep as _deepClone } from "lodash";
import { ICell } from "./../Interfaces/Cell.interface";
import { Stack } from "../DataStructure/Stack";
import { startNode, endNode } from "./helpers";
import { nonWeightedAllNeighbours } from "./Neighbours";

/**
 * Uses non recursive way with stacks
 * @reference en.wikipedia.org/wiki/Depth-first_search
 * @param nodes
 */
export const DFS = (nodes: ICell[]): ICell[] | [] => {
  const unvisitedNodes = _deepClone(nodes);
  const stack = new Stack<ICell>();

  const initialNode = startNode(nodes) as ICell;
  const goalNode = endNode(nodes);
  if (typeof goalNode === "undefined") return [];

  stack.push(initialNode);
  const visitedNodes: ICell[] = [];
  while (!stack.isEmpty()) {
    const current = stack.pop();
    if (current && current.endNode) {
      visitedNodes.push(current);
      return visitedNodes;
    }
    if (!current.isVisited) {
      current.isVisited = true;
      visitedNodes.push(current);
      const neighbouringNodes = nonWeightedAllNeighbours(
        current,
        unvisitedNodes
      );
      for (const node of neighbouringNodes) {
        stack.push({ ...node, previousNode: current });
      }
    }
  }
  return [];
};
