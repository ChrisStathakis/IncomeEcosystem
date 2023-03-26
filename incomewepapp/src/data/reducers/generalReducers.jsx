import { CLEAR_SEARCH, PAYMENT_METHODS, SEARCH } from "../actionTypes";



const initialState = {
    search_name: '',
    paymentMethods: []
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
        default:
            return state
    }
}