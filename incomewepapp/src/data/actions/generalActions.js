import { CLEAR_SEARCH, PAYMENT_METHODS, SEARCH } from "../actionTypes"
import axiosInstance from "../axiosInstance"
import { PAYMENTS_METHOD_ENDPOINT } from "../endpoints"



export const searchBarAction = (q) => dispatch =>{
    
    return dispatch({
        type: SEARCH,
        payload: q
    })
}

export const clearSearchBarAction = () => dispatch => {
    
    return dispatch ({
        type: CLEAR_SEARCH,
    })
}


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
}