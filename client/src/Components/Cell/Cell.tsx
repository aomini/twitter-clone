import * as React from 'react';
import './cell.styles.scss'

interface IProp{
    columns : number
    row: number
}

const Cell: React.FC<IProp> = ({columns, row}) => {
    return (
        <div></div>       
    )
}
export default Cell;
