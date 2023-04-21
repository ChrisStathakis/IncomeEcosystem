import { BALANCE_SHEET, CLEAR_SEARCH, PAYMENT_METHODS, SEARCH } from "../actionTypes";



const initialState = {
    search_name: '',
    paymentMethods: [],
    balanceSheet:{
        totals:{},
        count:{},
        monthly:{}
    }
}

export default function generalReducers(state=initialState, action) {

    switch (action.type){

        case SEARCH:
            return {
                ...state,
                search_name: action.payload
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                search_name: ' '
            }

        case PAYMENT_METHODS:
            return {
                ...state,
                paymentMethods: action.payload
            }
        case BALANCE_SHEET:
            return {
                ...state,
                balanceSheet: action.payload
            }
        default:
            return state
    }
}