import React, {useState, useEffect} from 'react';
import { Box, Grid, TextField, Typography, Button, List, ListItemText, ListItem } from '@mui/material';

import axiosInstance from '../../data/axiosInstance';
import { VENDORS_INVOICES_ANALYSIS_ENDPOINT } from '../../data/endpoints';
import { DataGrid } from '@mui/x-data-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchInvoiceAnalysis } from '../../data/actions/vendorActions'
import withRouter from '../../components/withRouter';

const vendorColumns = [
    {field: 'vendor__title', headerName: 'Vendor'},
    {field: 'total', headerName:'Total'}
]


function VendorAnalysisView(props){

    const [date_start, setDateStart] = useState('');
    const [date_end, setDateEnd] = useState('');
    const [invoicesData, setInvoicesData] = useState('')
    const [invoicesPerMonth, setInvoicesPerMonth] = useState([]);
    const [invoicesPerVendor, setInvoicesPerVendor] = useState([]);

    useEffect(()=>{
        props.fetchInvoiceAnalysis();

    }, [])
        
    return (
        <Grid container sx={{margin:'2%'}}>
            <Grid item xs={4}>
                <DataGrid columns={vendorColumns} rows={props.data.vendors_analysis} getRowId={(row)=> row.vendor__title} />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    data: state.vendorReducers.invoice_analysis
})

export default  compose(withRouter, connect(mapStateToProps, {fetchInvoiceAnalysis}))(VendorAnalysisView);