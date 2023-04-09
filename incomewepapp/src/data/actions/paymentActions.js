import axiosInstance from "../axiosInstance";
import {
    INVOICE_LIST_ENDPOINT,
    INVOICE_UPDATE_ENDPOINT,
    PAYMENT_LIST_ENDPOINT,
    VENDORS_LIST_ENDPOINT, VENDOR_DETAIL_ENDPOINT, PAYMENT_UPDATE_ENDPOINT
} from "../endpoints";
import {
    DELETE_PAYMENT, UPDATE_PAYMENT,
    CREATE_VENDOR_PAYMENT, 
    FETCH_VENDOR, FETCH_VENDORS, FETCH_VENDOR_INVOICES, FETCH_VENDOR_PAYMENTS, UPDATE_VENDOR, DELETE_VENDOR_INVOICE, UPDATE_VENDOR_INVOICE
} from "../actionTypes"


export const fetchPayments = (q='') => dispatch =>{
    const endpoint = PAYMENT_LIST_ENDPOINT + q;
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const response = respData.data
                const data = response.results.map(ele =>({
                    id: ele.id,
                    date: ele.date,
                    title: ele.title,
                    value: ele.final_value,
                
                }))
                const invoices = {...response, results: data}
                return dispatch({
                    type: FETCH_VENDOR_PAYMENTS,
                    payload: invoices
                })
            }
        )
};




export const createPayment = (data) => dispatch => {
    axiosInstance.post(PAYMENT_LIST_ENDPOINT, data)
        .then(
            respData=> {
                const endpoint = `${VENDOR_DETAIL_ENDPOINT}${data.vendor}/`;
                axiosInstance.get(endpoint)
                    .then(
                        response=>{
                            return dispatch({
                                type: CREATE_VENDOR_PAYMENT,
                                payload: respData.data,
                                vendor: response.data
                            })
                        }
                    )

            }
        )
};


export const updatePayment = (data) => dispatch =>{
    const endpoint = PAYMENT_UPDATE_ENDPOINT + `${data.id}/`;
    axiosInstance.put(endpoint, data)
        .then(
            respData => {
                const vendor_endpoint = `${VENDOR_DETAIL_ENDPOINT}${data.vendor}/`;
                axiosInstance.get(vendor_endpoint)
                    .then(
                        response =>{
                            return dispatch({
                                type: UPDATE_PAYMENT,
                                vendor: response.data,
                                payload: respData.data
                            })
                        }
                    )
            }
        )
}

export const deletePayment = (data) => dispatch => {
    const endpoint = PAYMENT_UPDATE_ENDPOINT + `${data.id}/`;

    axiosInstance.delete(endpoint)
        .then(repData=>{
            const vendor_endpoint = `${VENDOR_DETAIL_ENDPOINT}${data.vendor}/`;
            axiosInstance.get(vendor_endpoint)
                .then(
                    response=>{
                        return dispatch({
                            type: DELETE_PAYMENT,
                            payload: data,
                            vendor: response.data
                        })
                    }
                )
        })

}