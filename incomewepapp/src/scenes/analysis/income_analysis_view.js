import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { createDataForChart, dateRange } from '../../components/tools';
import { Box, Grid, TextField, Typography, Button, List, ListItemText, ListItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';
import axiosInstance from '../../data/axiosInstance';
import { INCOMES_LIST_ENDPOINT } from '../../data/endpoints';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { dateRangeFilter } from '../../components/tools';
import { ANALYSIS_INCOME_ENDPOINT } from '../../data/endpoints';

const total ={
    sum_z__sum: 78705.42,
    pos__sum: 35066.05,
    cash__sum: 43639.37,
    order_cost__sum: 1523.54
}

const average = {
    sum_z__avg: 150.0,
    pos__avg: 0.0,
    cash__avg: 150.0,
    order_cost__avg: 0.0
}

const columns = [
    { field: 'month', headerName:' Month', width: 100},
    { field: 'total', name:'Z Value', width: 100},
    {field: 'pos_total', name:"pos", width:100},
    {field: 'cash_total', name:"cash", width:100}
]

const lineData = [{name:'January', uv:1500, pv:2400, amt: 2400}, 
                  {name:'February', uv:1000, pv:2400, amt: 2400}
                ]

function AnalysisIncomeView(props){
    const [tableData, setTableData] = useState({});
    const [monthData, setMonthData] = useState({});
    const [totalData, setTotalData] = useState(total)
    const [avgData, setAvgData] = useState(average)
    const [date_start, setDateStart] = useState('');
    const [date_end, setDateEnd] = useState('');
    const [date_range, setDateRange] = useState(dateRangeFilter());
    const [error, setError] = useState('');

    useEffect(()=>{
        let endpoint = ANALYSIS_INCOME_ENDPOINT
        if (date_range.length > 3){
            endpoint = ANALYSIS_INCOME_ENDPOINT + date_range
        }
        
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    const response = respData.data;
                    const chartData = createDataForChart(response.data_per_month.analysis_per_month)
                    setMonthData(chartData);
                    setAvgData(response.total_data.averages)
                    setTotalData(response.total_data.totals);
                    
                }
            )
    }, [date_range])


    
    const handleDate = () => {
        const start = new Date(date_start);
        const end = new Date(date_end);
        if (end >= start){
            const new_range = dateRangeFilter(date_start, date_end)
            setDateRange(new_range)
        } else {
            setError('PROBLEM WITH DATES, FIX IT')
        }
    }


    if (props.isAuthenticated === 'false'){ return <Navigate to='/login/' />}

    return (

        <Grid m="20px" container>
            <Grid alignContent='center' justifyContent='center' item xs={12}>
                <Typography>Incomes Analysis </Typography>
                <Typography></Typography>
            </Grid>

            <Grid item xs={4}>
                <Box sx={{margin: '2%'}}> 
                    <TextField value={date_start} onChange={(e)=>setDateStart(e.target.value)} type='date'  label='From...' fullWidth />
                    <TextField value={date_end} onChange={(e)=>setDateEnd(e.target.value)} type='date' label='Until...' fullWidth />
                    
                    <Button sx={{marginTop: "3%"}} onClick={handleDate} variant='contained'>Save</Button>
                </Box>
                <Typography>{error}</Typography>
                <br />
                <hr />
                <Box>
                    <Typography>INFO</Typography>
                    <List>
                        <ListItem>
                            <ListItemText>TOTAL Z: {totalData.sum_z__sum}</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Grid>
            <Grid  sx={{margin: '2%'}} item xs={6}>
                <Typography variant='h3'>TOTAL DATA</Typography>
                <table sx={{marginTop: '5%'}} className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>-</th>
                            <th>Z</th>
                            <th>POS</th>
                            <th>CASH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>TOTAL</td>
                            <td>{totalData.sum_z__sum}</td>
                            <td>{totalData.pos__sum}</td>
                            <td>{totalData.cash__sum}</td>
                        </tr>
                        <tr>
                            <td>AVG</td>
                            <td>{avgData.sum_z__avg}</td>
                            <td>{avgData.pos__avg}</td>
                            <td>{avgData.cash__avg}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </Grid>
            <Grid item xs={12}>
                <LineChart width={1200} height={400} data={monthData}> 
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pos_total" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </Grid>
            <Grid item xs={12}>
                <Box
                    m="40px 0 0 0 0"
                    height="75vh">
                    <DataGrid getRowId={(row)=> row.month} columns={columns} rows={monthData}/>
                </Box>
            </Grid>
        </Grid>
    )
    
}


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})


export default compose(withRouter, connect(mapStateToProps, {}))(AnalysisIncomeView);


