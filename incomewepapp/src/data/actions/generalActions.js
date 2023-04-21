import { BALANCE_SHEET, CLEAR_SEARCH, PAYMENT_METHODS, SEARCH } from "../actionTypes"
import axiosInstance from "../axiosInstance"
import { BALANCE_SHEET_ENDPOINT, PAYMENTS_METHOD_ENDPOINT } from "../endpoints"



export const searchBarAction = (q) => dispatch =>{
    
    return dispatch({
        type: SEARCH,
        payload: q
    })
};

export const clearSearchBarAction = () => dispatch => {
    
    return dispatch ({
        type: CLEAR_SEARCH,
    })
};


export const fetchPaymentMethod = () => dispatch => {
    axiosInstance.get(PAYMENTS_METHOD_ENDPOINT)
        .then(
            respData =>{
                return dispatch({
                    type: PAYMENT_METHODS,
                    payload: respData.data
                })
            }
        )
};


export const fetchBalanceSheet = (query='') => dispatch => {
    let endpoint = BALANCE_SHEET_ENDPOINT;
    if (query.length > 2) { endpoint = endpoint + query};
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const response = respData.data;
                console.log('sheet', response)
                return dispatch({
                    type: BALANCE_SHEET,
                    payload: response
                })
            }
        )
}