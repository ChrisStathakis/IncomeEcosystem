import { useTheme } from "@emotion/react"
import React from 'react';
import { Typography, Box } from "@mui/material";
import { connect } from "react-redux";
import { redirect, Navigate} from 'react-router-dom';
import { compose } from "redux";
import { tokens } from "../theme";
import withRouter from '../../components/withRouter';


const Dashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {isAuthenticated} = props;
    console.log('isAuth', isAuthenticated);
    if (isAuthenticated === 'false' || isAuthenticated === null){return <Navigate to='/login/' />}
    return (
        <Box m="20px">
            <Typography>Hello</Typography>
        </Box>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, {}))(Dashboard);