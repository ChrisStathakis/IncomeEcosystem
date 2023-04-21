import { useTheme } from "@emotion/react"
import React, {useEffect} from 'react';
import { Typography, Box } from "@mui/material";
import { connect } from "react-redux";
import { redirect, Navigate} from 'react-router-dom';
import { compose } from "redux";
import { tokens } from "../theme";
import withRouter from '../../components/withRouter';

import { fetchIncomes } from '../../data/actions/incomeActions.jsx';

const Dashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {isAuthenticated} = props;
    console.log('isAuth', isAuthenticated);
    useEffect(()=>{
        props.fetchIncomes();
    }, [])

    if (isAuthenticated === 'false' || isAuthenticated === false){return <Navigate to='/login/' />}
    return (
        <Box m="20px">
            <Typography>Hello</Typography>
        </Box>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, {fetchIncomes}))(Dashboard);