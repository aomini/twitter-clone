import { find as _find } from "lodash";
import { ICell } from "./../Interfaces/Cell.interface";

export type ICellNode = ICell | {};

export const startNode = (nodes: ICell[]): ICellNode =>
  _find(nodes, "startNode") || {};
export const endNode = (nodes: ICell[]): ICellNode =>
  _find(nodes, "endNode") || {};
