import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field:'date_expired', headerName: "Date", flex:1},
    { field:'sum_z', headerName:"Value", flex:1},
    { field:'pos', headerName:"POS", flex: 1},
    { field:"taxes_6", headerName:"6%", flex:1}
]


export default function IncomeList(props){


    return (
        <Box
            m="40px 0 0 0 0"
            height="75vh"
        >
            <DataGrid columns={columns} rows={props.list.results} onRowClick={(params)=> props.handleDataGrid(params.row)}  />
        </Box>
    )
}

