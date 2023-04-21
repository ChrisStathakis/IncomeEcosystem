import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, {useState, useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';

import { fetchBalanceSheet } from '../../data/actions/generalActions'
import DateFilter from '../../components/dateFilter';
import { DataGrid } from '@mui/x-data-grid';
 

const columns = [
    {field:'month', headerName:'Month'},
    {field:'total', headerName:'Total'}
]


class BalanceSheetView extends React.Component {
    
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetchBalanceSheet();
    }

    handleDate = (date_start, date_end) => {

    }


    render(){
        const { totals, counts, monthly } = this.props.data;
        const {isAuthenticated} = this.props;
       
        if (isAuthenticated !== 'true'){ return <Navigate to='/login/' />}
        return (
            <Grid container sx={{margin:'2%'}}>
                <Grid item xs={4}>
                    <DateFilter handleDate={this.handleDate} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4">TOTALS</Typography>
                    <TableContainer>
                        <Table aria-label="simply table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>CATEGORY</TableCell>
                                    <TableCell>TOTAL</TableCell>
                                    <TableCell>COUNT</TableCell>
                                    
                                </TableRow>
                            </TableHead>    
                            <TableBody>
                                <TableRow>
                                    <TableCell>INCOMES</TableCell>
                                    <TableCell>{totals.total_income}</TableCell>
                                    <TableCell>{counts.count_incomes}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>INVOICES</TableCell>
                                    <TableCell>{totals.total_invoices}</TableCell>
                                    <TableCell>{counts.count_invoices}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>PAYMENTS</TableCell>
                                    <TableCell>{totals.total_payments}</TableCell>
                                    <TableCell>{counts.count_payments}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DIFFERENCE</TableCell>
                                    <TableCell>{totals.real_diff}</TableCell>
                                    <TableCell>{totals.logistic_diff}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant='h3'>ANALYSIS PER MONTH</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h4'>INCOMES</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>MONTH</TableCell>
                                    <TableCell>TOTAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monthly.incomes.analysis_per_month.map((item)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{item.month}</TableCell>
                                            <TableCell>{item.total}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h4'>INVOICES</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>MONTH</TableCell>
                                    <TableCell>TOTAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monthly.invoices.map((item)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{item.month}</TableCell>
                                            <TableCell>{item.total}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h4'>PAYMENTS</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>MONTH</TableCell>
                                    <TableCell>TOTAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monthly.payments.map((item)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{item.month}</TableCell>
                                            <TableCell>{item.total}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

        </Grid>
        )
    }
}





const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    data: state.generalReducers.balanceSheet
})


export default compose(withRouter, connect(mapStateToProps, {fetchBalanceSheet}))(BalanceSheetView);

