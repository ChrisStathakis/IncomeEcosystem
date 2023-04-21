import { Box, Button, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';





export default function DateFilter(props){

    const [date_start, setDateStart] = useState('');
    const [date_end, setDateEnd] = useState('');
    

    const handleSubmit = () => {
        if (date_start > date_end) {
            props.handleDateFilter(date_start, date_end)
        }
    }


    return (
        <Box>
            <Typography variant='h4'>Date Filter</Typography>
            <TextField type='date' label='From...' value={date_start} onChange={(e)=>setDateStart(e.target.value)} />
            <TextField type='date' label='Until' value={date_end} onChange={(e)=>setDateEnd(e.target.value)} />
            <br />
            <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: '2%'}}>Search...</Button>
        </Box>
    )

}