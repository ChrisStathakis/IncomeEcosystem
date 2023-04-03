import React,  {useState } from 'react';
import { Box } from '@mui/system';
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from "../../../components/withRouter";
import { updateInvoice } from '../../../data/actions/vendorActions';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { parse } from "date-fns";

const handleDateChange = (dateString) => {
  const dateObject = parse(dateString, "mm-dd-yyyy", new Date());
  console.log(dateObject)
  return dateObject
};


const InvoiceFormView = (props) => {
     const { instance, vendor } = props;
     const [date, setDate ] = useState(instance.date);
     const [value, setValue] = useState(instance.value);
     const [payment_method, setPaymentMethod] = useState(instance.payment_method);
     const [title, setTitle] = useState(instance.title);

    const handleSubmit = () => {
        const data = {
            date: date,
            title:title,
            value: value,
            vendor: vendor.id,
            id:instance.id,
            extra_value:0,
            payment_method: payment_method
        };
        console.log('data', data)
        props.updateInvoice(data);
        props.action()

    };
    
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
                    <Button sx={{ marginBottom:'8%'}} color="error" onClick={handleSubmit} variant="outlined">Delete</Button>
                    <hr />
                    <TextField
                        sx={{ marginBottom:'4%'}}
                        id="date"
                        label="Select Date"
                        type="date"
                        value={date}
                        onChange={(e)=> setDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                          }}
                        fullWidth
                    />
                    <TextField  InputLabelProps={{ shrink: true }}  value={title} onChange={(e)=> setTitle(e.target.value)} label='Title' fullWidth />
                    <TextField 
                        select
                        label="Payment Method"
                        value={payment_method}
                        onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        helperText="Choose"
                        fullWidth
                    >
                        {props.paymentMethods.results.map((option)=>(
                            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                        ))}
                         </TextField>
                    <TextField  InputLabelProps={{ shrink: true }}  value={value} onChange={(e)=> setValue(e.target.value)} label='Title'  fullWidth/>
                    <Button onClick={handleSubmit} variant="contained" sx={{ marginTop:2 }}>Save</Button>
                    
                    <Button onClick={props.action} variant="contained" sx={{ marginTop:2 }}>Close</Button>
                </Box>
            </Grid>
        </Grid>
    </div>
    )
        
    
};

const mapStateToProps = state => ({
    paymentMethods: state.generalReducers.paymentMethods,
});

export default compose(withRouter, connect(mapStateToProps, {updateInvoice}))(InvoiceFormView);