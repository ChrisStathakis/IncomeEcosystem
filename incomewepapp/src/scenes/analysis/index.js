import {Card, CardHeader, CardContent, CardActions, Button, Grid } from "@mui/material";
import React, {useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';

import axiosInstance from '../../data/axiosInstance'
import { ANALYSIS_INCOME_ENDPOINT } from "../../data/endpoints";



function HomepageAnalysis(props){
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [average, setAverage] = useState(0);

    useEffect(()=>{
        const fetchData = async () => {
            await axiosInstance.get(ANALYSIS_INCOME_ENDPOINT)
                .then(respData=>{
                    const data = respData.data
                    console.log('data',data)
                    setTotal(data.total_incomes);
                    setCount(data.count_incomes);
                    setAverage(data.average_incomes);
                }
                    
            )
            
        };
        fetchData();
         
    }, [])
    if ( props.isAuthenticated === 'false' || props.isAuthenticated === null){return <Navigate to='/login/' />}
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="INCOMES" />
                    <CardContent>
                        Total incomes: {total} <br />
                        Count: {count} | Average: {average}
                    </CardContent>
                    <CardActions>
                        <Link to='/analysis/incomes/'>  <Button size="small" variant="contained" color="primary">Learn More</Button> </Link>
                    </CardActions>
                </Card>

            </Grid>

            <Grid item xs={4}>
        
                <Card>
                    <CardHeader title="VENDORS" />
                    <CardContent>

                    </CardContent>
                    <CardActions>
                    <Link to='/analysis/vendors/'>  <Button size="small" variant="contained" color="primary">Learn More</Button> </Link>
                    </CardActions>
                </Card>
        
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="INCOMES" />
                    <CardContent>
                        
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" color="primary">Learn More</Button>
                    </CardActions>
                </Card>
            
            </Grid>
        </Grid>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default compose(withRouter, connect(mapStateToProps, {}))(HomepageAnalysis);