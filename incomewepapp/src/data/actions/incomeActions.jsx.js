import { INCOMES_LIST_ENDPOINT, INCOMES_DETAIL_ENDPOINT } from "../endpoints";
import { FETCH_INCOMES, FETCH_INCOME, UPDATE_INCOME, DELETE_INCOME, CREATE_INCOME } from "../actionTypes";
import axiosInstance  from '../axiosInstance'


export const fetchIncomes = () => dispatch => {
    axiosInstance.get(INCOMES_LIST_ENDPOINT)
        .then(
            respData=>{
                dispatch({
                    type: FETCH_INCOME,
                    payload: respData.data
                })
            }
        )

}


export const createIncome = (data) => dispatch => {
    axiosInstance.post(INCOMES_LIST_ENDPOINT, data)
        .then(
            respData=>{
                dispatch({
                    type: CREATE_INCOME,
                    payload: respData.data
                })
            }
        )
}

export const updateInvoice = (data) => dispatch => {
    const endpoint = INCOMES_DETAIL_ENDPOINT + `${data.id}/`;
    axiosInstance.put(endpoint, data)
        .then(
            respData => {
                
                dispatch({
                    type: UPDATE_INCOME,
                    payload: respData.data
                })
            }
        )
}

export const deleteInvoice = data => dispatch =>{
    const endpoint = INCOMES_DETAIL_ENDPOINT + `${data.id}/`;
    axiosInstance.delete(endpoint)
        .then(respData=>{
            dispatch({
                type: DELETE_INCOME
            })
        })
}