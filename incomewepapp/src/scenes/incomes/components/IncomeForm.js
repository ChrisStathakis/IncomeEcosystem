import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

/*
{
    "id": 698,
    "date_expired": "2023-03-29",
    "sum_z": "1000.00",
    "pos": "600.00",
    "order_cost": "0.00",
    "extra": "0.00",
    "notes": "",
    "logistic_value": "1000.00",
    "value": "1000.00",
    "cash": "400.00",
    "taxes_6": "120.00",
    "taxes_13": "100.00",
    "taxes_24": "200.00"
},
*/

export default function IncomeForm(props){

    const [date_expired, setDate] = useState('');
    const [sum_z, setSumZ] = useState(0);
    const [pos, setPos] = useState(0);
    const [taxes_6, setTaxes6] = useState(0);
    const [taxes_13, setTaxes13] = useState(0);
    const [taxes_24, setTaxes24] = useState(0)

    const submitData = () => {
        const data = {date_expired, sum_z, pos, taxes_6, taxes_13, taxes_24}
        props.handleForm(data);
    }

    return (
        <Box>
            <Typography variant='h4'>Create Income</Typography>
            <Box>
                <TextField
                    type='date'
                    sx={{ marginBottom: "4%"}}
                    label="Select Date"
                    value={date_expired}
                    onChange={(e)=>setDate(e.target.value)}
                    InputLabelProps={{ shrink: true}}
                    fullWidth
                />
                <TextField type='number' label='Z' value={sum_Z} onChange={(e)=>setSumZ(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                <TextField type='number' label='POS' value={pos} onChange={(e)=>setPos(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                <TextField type='number' label='Taxes 6%' value={taxes_6} onChange={(e)=>setTaxes6(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                <TextField type='number' label='Taxes 13%' value={taxes_13} onChange={(e)=>setSumZ(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                <TextField type='number' label='Taxes 24%' value={taxes_24} onChange={(e)=>setSumZ(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                <TextField type='number' label='Z' value={sum_Z} onChange={(e)=>setSumZ(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
            </Box>
        </Box>
    )

}