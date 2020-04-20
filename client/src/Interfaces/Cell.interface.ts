export interface ICellCoordinate{
    row : number;
    column : number;
}

export interface ICell extends ICellCoordinate{
    distance : number;
    startNode: boolean;
    endNode: boolean;
    isVisited : boolean;
    wall ?: boolean;
    previousNode : this | null;
}