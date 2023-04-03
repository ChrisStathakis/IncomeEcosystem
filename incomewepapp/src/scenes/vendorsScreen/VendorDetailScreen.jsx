import { Typography ,Box, Grid, TextField, Button, Table, TableHead, TableCell, TableBody, TableRow, FormControl, InputLabel, Select, MenuItem, Modal } from "@mui/material";

import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { fetchInvoices, fetchPayments, createInvoice, createPayment, fetchVendor } from '../../data/actions/vendorActions';
import { fetchPaymentMethod } from "../../data/actions/generalActions";
import InvoiceFormView from './components/invoiceForm';
import PaymentForm from './components/paymentForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    color: 'black',
    border: '2px solid #000',
    boxShadow: 24,
};

const invoiceColumns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'title', headerName: 'Title', flex: 1, cellClassName: "name-column--cell", },
    { field: 'payment_method', headerName: 'Payment Method', flex:1 },
    { field: 'value', headerName: 'Value', flex:1 },
    { field: 'button', headerName: 'Details', flex:1 , renderCell: (cellValues) => <Button  variant="contained"  color="secondary">Edit</Button>}
  ];


const paymentColumns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'title', headerName: 'Title', flex: 1, cellClassName: "name-column--cell", },
    { field: 'payment_method', headerName: 'Payment Method', flex:1 },
    { field: 'value', headerName: 'Value', flex:1 },
    { field: 'button', headerName: 'Details', flex:1 , renderCell: (cellValues) => <Button  variant="contained"  color="secondary">Edit</Button>}
];

class VendorDetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            vendor: {},
            showEditInvoiceForm: false,
            editInvoice: {
                show: false,
                vendor: '',
                invoice: ''
            },
            editPayment: {
                show: false,
                vendor: '',
                payment: ''
            },
            invoice: {
                title: '',
                value: 0,
                date: '',
                payment_method: '',
                extra_value: 0,

            },
            payment_form: {
                date: '',
                title: '',
                payment_method: '',
                vendor: '',
                value: ''
            }
           
        }
    }

    handleShowInvoiceForm = () => {this.setState({showInvoiceForm: !this.state.showInvoiceForm})}


    componentDidMount(){
        const vendor_id = this.props.router.params.vendor_id;
        const query = `?vendor=${vendor_id}`;
        this.props.fetchVendor(vendor_id);
        this.props.fetchInvoices(query);
        this.props.fetchPayments(query);
        this.props.fetchPaymentMethod();
    }

    handleEdit = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const vendor = {...this.state.vendor, [name]: value};
        this.setState({vendor: vendor})
    };

    handleSubmitEdit = () =>{
        console.log(this.state.vendor);
    };

    handleInvoice = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const invoice = {...this.state.invoice, [name]:value};
        this.setState({invoice: invoice})
    };

    handlePayment = (e) => {
        const { name, value } = e.target;
        const paymentForm = {...this.state.payment_form, [name]: value};
        this.setState({payment_form: paymentForm});
    };

    submitPayment = () => {
        const id  = this.props.router.params.vendor_id;
        const data = {...this.state.payment_form, vendor:id};
        this.props.createPayment(data);

    };

    handleEditInvoice = (row) => {
        const editInvoice = {vendor:this.props.vendor, invoice:row, show:true};
        this.setState({
            ...this.state,
            editInvoice: editInvoice
        })
    };

    handleEditPayment = (row) => {
        const editPayment = { vendor:this.props.vendor, instance: row, show:true}
        this.setState({
            ...this.state,
            editPayment: editPayment
        })
    }

    handleSubmitInvoice = () => {
        const id  = this.props.router.params.vendor_id;
        const data = {...this.state.invoice, vendor:id};
        this.props.createInvoice(data);
        
    };

    closeFormWindow = () => {
        const editPayment = {...this.state.editPayment, show: false};
        const editInvoice = { ...this.state.editInvoice, show: false};
        this.setState({
            ...this.state,
            editPayment: editPayment,
            editInvoice: editInvoice
        })
    }

    render() {
        const { invoice, payment_form, editInvoice, editPayment } = this.state;
        const { invoices, payments, paymentMethods, vendor, isAuthenticated } = this.props;
        if (isAuthenticated === 'false' || isAuthenticated === null){return <Navigate to='/login/' />}

        return (
           <div>
                <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography as="h4">{vendor.title} Balance: {vendor.balance}</Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={4}>
                        
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Typography>Details</Typography>
                            <TextField value={vendor.title} name='title' label='Title' InputLabelProps={{ shrink: true }} onChange={this.handleEdit} />
                            <TextField sx={{ marginTop:2 }} value={vendor.afm} name='afm' label='Taxes ID' InputLabelProps={{ shrink: true }} onChange={this.handleEdit} />
                            <TextField sx={{ marginTop:2 }} value={vendor.doy} name='doy' label='DOY' InputLabelProps={{ shrink: true }} onChange={this.handleEdit} />
                            <TextField sx={{ marginTop:2 }} value={vendor.phone} name='phone' label='Phone' InputLabelProps={{ shrink: true }} onChange={this.handleEdit} />
                            <TextField sx={{ marginTop:2 }}  value={vendor.cellphone} name='cellphone' label='CellPhone' InputLabelProps={{ shrink: true }} onChange={this.handleEdit} />
                            <Button onClick={this.handleSubmitEdit} variant="contained" sx={{ marginTop:2 }} >Save </Button>

                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Typography>CREATE INVOICE</Typography>
                            <input label='Date' value={invoice.date} type='date' name='date' className="MuiInputBase-input MuiOutlinedInput-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"
                                onChange={this.handleInvoice}/>
                                <FormControl fullWidth>
                                    <InputLabel id="payment_method_label">Payment Method</InputLabel>
                                    <Select
                                        labelId="payment_method_label"
                                        id="payment_method"
                                        value={invoice.payment_method}
                                        name="payment_method"
                                        label="Payment Method"
                                        onChange={this.handleInvoice}
                                    >
                                        {paymentMethods.results ? paymentMethods.results.map(ele=>{return <MenuItem value={ele.id}>{ele.title}</MenuItem>}): null}
                                    </Select>

                                </FormControl>
                                <TextField  onChange={this.handleInvoice} sx={{ marginTop:2 }}  value={invoice.title} name='title' label='Title' InputLabelProps={{ shrink: true }} fullWidth />
                                <TextField type='number' onChange={this.handleInvoice} sx={{ marginTop:2 }}  value={invoice.value} name='value' label='Value' InputLabelProps={{ shrink: true }} fullWidth />
                                <Button onClick={this.handleSubmitInvoice} variant="contained" sx={{ marginTop:2 }}>Save</Button>
                        </Box>
                        

                    </Grid>
                    <Grid item xs={4}>
                        <Typography>CREATE  PAYMENT</Typography>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="payment_method_label">Date</InputLabel>
                                <input value={payment_form.date} type='date' name='date' className="MuiInputBase-input MuiOutlinedInput-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"
                                onChange={this.handlePayment}/>
                            </FormControl>

                            <FormControl fullWidth>
                                 <InputLabel id="payment_method_label">Payment Method</InputLabel>
                                 <Select
                                        labelId="payment_method_label"
                                        id="payment_method"
                                        value={invoice.payment_method}
                                        name="payment_method"
                                        label="Payment Method"
                                        onChange={this.handleInvoice}
                                 >
                                        {paymentMethods.results ? paymentMethods.results.map(ele=>{return <MenuItem value={ele.id}>{ele.title}</MenuItem>}): null}</Select>

                             </FormControl>
                             <TextField  onChange={this.handlePayment} sx={{ marginTop:2 }}  value={payment_form.title} name='title' label='Title' InputLabelProps={{ shrink: true }} fullWidth />
                             <TextField type='number' onChange={this.handlePayment} sx={{ marginTop:2 }}  value={payment_form.value} name='value' label='Value' InputLabelProps={{ shrink: true }} fullWidth />

                             <Button onClick={this.submitPayment} variant="contained" sx={{ marginTop:2 }}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
                {editInvoice.show === false && editPayment.show === false ? 
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h1"  component="h4">Invoices</Typography>
                         {invoices.results ? <DataGrid onRowClick={(params)=> this.handleEditInvoice(params.row)} sx={{height: '500px'}} rows={invoices.results} columns={invoiceColumns} getRowId={(row)=> row.id}  /> :null}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h1" component="h4">Payments</Typography>
                        {payments.results ? <DataGrid onRowClick={(params)=> this.handleEditInvoice(params.row)} sx={{height: '500px'}} rows={payments.results} columns={paymentColumns} getRowId={(row)=> row.id} /> : null}
                    </Grid>
                </Grid> : null}
               
                {editInvoice.show ? <InvoiceFormView instance={editInvoice.invoice} vendor={editInvoice.vendor} action={this.closeFormWindow} />: null}
                {editPayment.show ? <PaymentForm instance={editPayment.payment} vendor={editPayment.vendor} action={this.closeFormWindow} /> :null }
              
            </div>
              
            
        )
    }
}

const mapStateToProps = state =>({
    invoices: state.vendorReducers.invoices,
    payments: state.vendorReducers.payments,
    paymentMethods: state.generalReducers.paymentMethods,
    vendor: state.vendorReducers.vendor,
    isAuthenticated: state.authReducer.isAuthenticated
});


export default compose(withRouter, connect(mapStateToProps, {fetchInvoices, fetchPayments, createInvoice, fetchPaymentMethod, fetchVendor, createPayment }))(VendorDetailScreen);