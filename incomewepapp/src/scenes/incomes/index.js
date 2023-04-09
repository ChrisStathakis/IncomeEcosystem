import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Navigate } from "react-router-dom";

import IncomeForm from "./components/IncomeForm";
import IncomeList from './components/IncomeList';
import { fetchIncomes, createIncome, updateIncome, deleteInvoice } from '../../data/actions/incomeActions.jsx';
import withRouter from "../../components/withRouter";


class IncomeView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            show:{
                list: true,
                detail: false,
                editForm: false
            },
            instance:{},
            
        }
    }

    componentDidMount(){
        this.props.fetchIncomes();
    }

    handleForm = (data, editForm) => { if(editForm) {this.props.updateIncome(data)} else {this.props.createIncome(data)} this.closeForm();}

    handleEditForm = (data) => {this.props.updateIncome(data); this.closeForm();}

    handleDelete = (data) =>{ this.props.deleteInvoice(data); this.closeForm(); };

    handleDataGrid = (params) => {
        this.setState({
            ...this.state,
            instance: params,
            show:{
                editForm:true,
                detail:true
            },
        })
    }
    showForm = () => {this.setState({...this.state, show:{list:false, detail:true}})}

    closeForm = () => {this.setState({...this.state, show: {list:true, detail: false, showEdit: false}})}

    render() {
        
        const { show, instance } = this.state;
        const { incomes, isAuthenticated } = this.props;
        if ( isAuthenticated === 'false'  || isAuthenticated === null){return <Navigate to="/login/" />}
        

        return(
           <Box m="20px">
                <Typography variant="h1" component="h2">Incomes</Typography>
                {show.detail ?
                    <IncomeForm handleForm={this.handleForm} closeForm={this.closeForm} editForm={show.editForm} instance={instance} deleteForm={this.handleDelete} /> 
                    : <Button sx={{marginBottom:'3%', marginTop:'1%'}} variant='contained' color='success' onClick={this.showForm} >CREATE INCOME </Button>
                    }
                {show.list && incomes.results ? <IncomeList handleDataGrid={this.handleDataGrid} list={incomes} />: null} 
                

           </Box>
        )
    }
}

const mapStateToProps = state => ({
    incomes: state.incomeReducers.incomes,
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, {fetchIncomes, createIncome, updateIncome, deleteInvoice}))(IncomeView);