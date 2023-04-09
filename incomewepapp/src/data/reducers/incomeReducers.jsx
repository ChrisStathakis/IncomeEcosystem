import { FETCH_INCOME, FETCH_INCOMES, UPDATE_INCOME, DELETE_INCOME, CREATE_INCOME } from "../actionTypes";


const initialStore = {
    incomes: {},
    income: {}
}


export default function incomeReducers(state=initialStore, action){
    let new_invoices = {};
    let instance = {};
    let results = [];
    switch(action.type){

        case FETCH_INCOMES:
            return {...state, incomes: action.payload};
        
        case CREATE_INCOME:
            instance = action.payload;
            results = [instance, ...state.incomes.results];
            new_invoices = {...state.incomes, results: results};
            return {...state, incomes: new_invoices, income: instance};

        case UPDATE_INCOME:
            instance = action.payload;
            results = state.incomes.results.map(item => item.id === action.payload.id ? action.payload : item);
            new_invoices = {...state.incomes, results: results};
            return { ...state,incomes: new_invoices };

        case DELETE_INCOME:
            results = state.incomes.results.filter(item => item.id !== action.payload.id);
            new_invoices = {...state.incomes, results:results}
            return {...state, incomes: new_invoices}

        default:
            return state
    }
}