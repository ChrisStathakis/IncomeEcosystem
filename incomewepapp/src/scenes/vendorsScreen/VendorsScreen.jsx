import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { DataGrid  } from '@mui/x-data-grid';
import { compose } from 'redux';
import withRouter from '../../components/withRouter';
import { connect } from 'react-redux';
import { fetchVendors } from '../../data/actions/vendorActions';
import {IS_AUTHENTICATED} from "../../data/actionTypes";


const renderDetailsButton = (params) =>{
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                
                >
                    More Info
                </Button>

        </strong>
    )
}

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', flex: 1, cellClassName: "name-column--cell", },
    { field: 'afm', headerName: 'Taxes ID', flex:1 },
    { field: 'balance', headerName: 'Balance', flex:1 },
    { field: 'button', headerName: 'Details', flex:1 , renderCell: (cellValues) => <Link to={`/vendor/${cellValues.id}`}>More</Link>}
  ];


class VendorScreen extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.fetchVendors();
    }

    handleSearch = (e) => {
        const q  = e.target.value;
        if (q.length > 2) {
            this.props.fetchVendors('?search=' + q);
            const data = this.props.vendors.results.map(ele =>({
                id: ele.id,
                title: ele.title,
                afm: ele.afm,
                balance: ele.balance,
                
                
            }));
            
            this.setState({
                data: data,
                rows: true
            })
        }
        
    };

    render(){
        const { vendors, isAuthenticated } = this.props;

        if ( isAuthenticated === 'false' || isAuthenticated === null){return <Navigate to='/login/' />}
        return (
            <Box m="20px">
                <Typography variant='h1' component='h2'>Vendors</Typography>
                <Box>
                    <TextField placeholder='Search...' onChange={this.handleSearch} />
                    
                </Box>
                
                <Typography variant='h6'>{this.props.search_name}</Typography>
                <Box
                    m="40px 0 0 0 0"
                    height="75vh"
                >
                    {vendors.results ? <DataGrid columns={columns} rows={vendors.results}   /> : <p>No data </p> }
                </Box>
    
            </Box>
        )
    } 
}




const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated,
    vendors: state.vendorReducers.vendors,
    search_name: state.generalReducers.search_name
})

/*
{
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
*/

export default compose(withRouter, connect(mapStateToProps, {fetchVendors}))(VendorScreen);