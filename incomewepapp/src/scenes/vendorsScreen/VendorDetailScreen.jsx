import { Typography, Box, Grid, TextField, Button, Table, TableHead, TableCell, TableBody, TableRow, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { fetchInvoices, fetchPayments, createInvoice, fetchVendor } from '../../data/actions/vendorActions';
import { fetchPaymentMethod } from "../../data/actions/generalActions"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}


const invoiceColumns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'title', headerName: 'Title', flex: 1, cellClassName: "name-column--cell", },
    { field: 'value', headerName: 'Balance', flex:1 },
    { field: 'button', headerName: 'Details', flex:1 , renderCell: (cellValues) => <Button variant="contained"  color="secondary">Edit</Button>}
  ];

class VendorDetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            vendor: {},
            invoice: {
                title: '',
                value: 0,
                date: '',
                payment_method: '',
                extra_value: 0,

            },
           
        }
    }



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
        const vendor = {...this.state.vendor, [name]: value}
        this.setState({vendor: vendor})
    }

    handleSubmitEdit = () =>{
        console.log(this.state.vendor);
    }

    handleInvoice = (e) => {
        console.log('e', e)
        const name = e.target.name;
        const value = e.target.value;
        const invoice = {...this.state.invoice, [name]:value}
        this.setState({invoice: invoice})
    }

    handleDate = (value) => {
        console.log('value', value.date())
        console.log('value', value)
        const date = value.value;
        
    }

    handleSubmitInvoice = () => {
        const id  = this.props.router.params.vendor_id;
        const data = {...this.state.invoice, vendor:id}
        this.props.createInvoice(data);

        
    }

    render() {
        const { invoice } = this.state;
        const { invoices, payments, paymentMethods, vendor } = this.props;
       
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
                            }}>                        <Typography>CREATE INVOICE</Typography>
                                
                            
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
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h1" component="h4">Invoices</Typography>
                         {invoices.results ? <DataGrid rows={invoices.results} columns={invoiceColumns} getRowId={(row)=> row.id}  /> :null}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h1" component="h4">Payments</Typography>
                        
                         <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.results ? payments.results.map(ele=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{ele.date}</TableCell>
                                        </TableRow>
                                    )
                                })
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
              
            
        )
    }
}


const mapStateToProps = state =>({
    invoices: state.vendorReducers.invoices,
    payments: state.vendorReducers.payments,
    paymentMethods: state.generalReducers.paymentMethods,
    vendor: state.vendorReducers.vendor
})

export default compose(withRouter, connect(mapStateToProps, {fetchInvoices, fetchPayments, createInvoice, fetchPaymentMethod, fetchVendor }))(VendorDetailScreen);