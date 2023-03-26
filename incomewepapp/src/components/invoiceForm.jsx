import React,  {useState } from 'react';

import moment from 'moment';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';


const InvoiceFormView = (props) => {
    const { EditForm, instance, payment_methods } = props;


    const [date, setDate ] = useState('');
    const [value, setValue] = useState(0);
    const [payment_method, setPaymentMethod] = useState(1);
    const [title, setTitle] = useState('');

    const formSubmit = () => {
        const data = {date: date, }

    }

    return (
        <Box>
            <Typography>{EditForm ? instance.title : 'New Invoice'}</Typography>
            <input type='date' className={}className="MuiInputBase-input MuiOutlinedInput-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input" />
        </Box>
    )
};

const mapStateToProps = state => ({
    payment_methods: state.genericReducers.payment_methods
})