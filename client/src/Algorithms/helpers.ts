import { find as _find } from "lodash";
import { ICell } from "./../Interfaces/Cell.interface";
export type ICellNodes = ICell | {} ;

export const startNode = (nodes: ICell[]): ICellNodes =>
  _find(nodes, "startNode") || {};
export const endNode = (nodes: ICell[]): ICellNodes =>
  _find(nodes, "endNode") || {};