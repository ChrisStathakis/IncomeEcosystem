import { Grid, MenuItem, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import withRouter from '../../../components/withRouter';
import { updatePayment } from '../../../data/actions/vendorActions'




const PaymentForm  = (props) => {
    const { instance, vendor, action } = props;
    const [date, setDate ] = useState(instance.date);
    const [value, setValue] = useState(instance.value);
    const [payment_method, setPaymentMethod] = useState(instance.payment_method);
    const [title, setTitle] = useState(instance.title);

   

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                    <Typography as="h4">{vendor.title} | {instance.title}</Typography>

            </Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={4}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={date}
                                onChange={setDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField  InputLabelProps={{ shrink: true }}  value={title} onChange={(e)=> setTitle(e.target.value)} label='Title' />
                        <TextField 
                            select
                            label="Payment Method"
                            value={payment_method}
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                            helperText="Choose"
                        >
                            {props.paymentMethods.results.map((option)=>(
                                <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                            ))}
                             </TextField>
                        <TextField  InputLabelProps={{ shrink: true }}  value={value} onChange={(e)=> setValue(e.target.value)} label='Title' />
                        <Button  variant="contained" sx={{ marginTop:2 }}>Save</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )

}


const mapStateToProps = state => ({
    paymentMethods: state.generalReducers.paymentMethods,
});

export default compose(withRouter, connect(mapStateToProps, {PaymentForm}))