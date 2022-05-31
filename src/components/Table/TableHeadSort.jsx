import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

export const TableHeadSort = ({order, orderBy, onRequestSort, headCells}) => {

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <React.Fragment key={headCell.id}>
                        {headCell.id === 'delete' && <TableCell>&nbsp;</TableCell>}
                        {headCell.id !== 'delete' && (
                            <TableCell sortDirection={orderBy === headCell.id ? order : false}>
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        )}
                    </React.Fragment>
                ))}
            </TableRow>
        </TableHead>);

}