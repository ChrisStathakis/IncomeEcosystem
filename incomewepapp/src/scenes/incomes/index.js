import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { Navigate } from "react-router-dom";

import IncomeForm from "./components/IncomeForm";
import IncomeList from './components/IncomeList';
import { fetchIncomes, createIncome } from '../../data/actions/incomeActions.jsx';
import withRouter from "../../components/withRouter";




class IncomeView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            show:{
                list: true,
                detail: false
            }
        }
    }

    componentDidMount(){
        this.props.fetchIncomes();
    }

    handleCreateForm = (data) => {
        this.props.createIncome(data);
        this.setState({
            ...this.state,
            show: {
                list:true,
                detail:false
            }
        })
    }

    closeFormWindow = () => {this.setState({...this.state, show: {list:true, detail: false}})}

    render() {
        const { show } = this.state;
        const { incomes, isAuthenticated } = this.props;
        if ( isAuthenticated === 'false'  || isAuthenticated === null){return <Navigate to="/login/" />}
        return(
           <Box m="20px">
                <Typography variant="h1" component="h2">Incomes</Typography>
                {show.list ? <IncomeList incomes={incomes} />: null}
                {show.details ? <IncomeForm handleForm={this.handleCreateForm} closeForm={this.closeForm} /> : null}

           </Box>
        )
    }
}

const mapStateToProps = state => ({
    incomes: state.incomeReducers.incomes
});

export default compose(withRouter, connect(mapStateToProps, {fetchIncomes, createIncome}))(IncomeView);