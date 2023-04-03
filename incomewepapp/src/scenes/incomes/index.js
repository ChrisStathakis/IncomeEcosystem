import React from 'React';


import { fetchIncomes } from '../../data/actions/incomeActions.jsx'
import {connect} from "react-redux/es/index";
import withRouter from "../../components/withRouter";
import {compose} from "redux/index";





class IncomeView extends React.Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        this.props.fetchIncomes();
    }

    render() {
        const { incomes } = this.props;

        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    incomes: state.incomeReducers.incomes
});

export default compose(withRouter, connect(mapStateToProps, {fetchIncomes}))(IncomeView);