import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import withRouter from "../../components/withRouter";

import { logoutAction } from "../../data/actions/authActions";


const LogoutScreen = (props) => {
    
    props.logoutAction();
    return <Navigate to="/" />

}


const mapStateToProps = state =>({ });


export default compose(withRouter, connect(mapStateToProps, { logoutAction }))(LogoutScreen);