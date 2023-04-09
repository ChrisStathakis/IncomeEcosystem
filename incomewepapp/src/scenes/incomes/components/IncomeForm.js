import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import moment from 'moment';


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
        const formattedDate = moment(date_expired).format('YYYY-MM-DD');
        let data = {date_expired: formattedDate, sum_z, pos, taxes_6, taxes_13, taxes_24, order_cost:0, extra:0}
        if (props.editForm) {data = {...data, id:props.instance.id}};
        props.handleForm(data, props.editForm);
       
        
    }

    useEffect(()=>{
        if (props.editForm){
            setDate(props.instance.date_expired);
            setSumZ(props.instance.sum_z)
            setPos(props.instance.pos)
            setTaxes6(props.instance.taxes_6);
            setTaxes13(props.instance.taxes_13);
            setTaxes24(props.instance.taxes_24);
        }

    }, []);
        


    return (
        <Box sx={{marginTop:'3%'}} alignContent="center" alignItems="center">
            <Typography variant='h4'>{props.editForm ? 'Edit' : 'Create Income'}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    {props.editForm ? <Button sx={{ marginTop:'5%'}} variant='contained' color='error' onClick={()=> props.deleteForm(props.instance)} >DELETE</Button>: null}
                </Grid>
                <Grid item xs={8}>
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
                        <TextField type='number' label='Z' value={sum_z} onChange={(e)=>setSumZ(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                        <TextField type='number' label='POS' value={pos} onChange={(e)=>setPos(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                        <TextField type='number' label='Taxes 6%' value={taxes_6} onChange={(e)=>setTaxes6(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                        <TextField type='number' label='Taxes 13%' value={taxes_13} onChange={(e)=>setTaxes13(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />
                        <TextField type='number' label='Taxes 24%' value={taxes_24} onChange={(e)=>setTaxes24(e.target.value)} InputLabelProps={{ shrink:true}} fullWidth />

                        <Button onClick={submitData} variant='contained'>Save</Button>
                        
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Paper>
                        <Button onClick={() => props.closeForm()} variant="container">Close</Button>
                    </Paper>
                </Grid>
            </Grid>
            
        </Box>
    )

}