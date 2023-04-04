import React, {setState} from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'id', headerName: "ID", flex:1},
    { field:'date', headerName: "Date", flex:1},
    { field:'value', headerName:"Value", flex:1}
]


export default function IncomeList(props){

    const [search, setSearch] = setState('');


    return (
        <Box
            m="40px 0 0 0 0"
            height="75vh"
        >
            {props.incomes.results ? <DataGrid columns={columns} rows={props.incomes.results}   /> : <p>No data </p> }
        </Box>
    )
}

