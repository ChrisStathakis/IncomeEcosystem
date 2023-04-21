import axiosInstance from "../axiosInstance";
import {
    INVOICE_LIST_ENDPOINT,
    INVOICE_UPDATE_ENDPOINT,
    PAYMENT_LIST_ENDPOINT,
    VENDORS_LIST_ENDPOINT, VENDOR_DETAIL_ENDPOINT, PAYMENT_UPDATE_ENDPOINT, VENDORS_INVOICES_ANALYSIS_ENDPOINT, VENDORS_PAYMENT_ANALYSIS_ENDPOINT
} from "../endpoints";
import {
    CREATE_VENDOR_INVOICE, UPDATE_PAYMENT,
    CREATE_VENDOR_PAYMENT, 
    FETCH_VENDOR, FETCH_VENDORS, FETCH_VENDOR_INVOICES, FETCH_VENDOR_PAYMENTS, UPDATE_VENDOR, DELETE_VENDOR_INVOICE, UPDATE_VENDOR_INVOICE, INVOICE_ANALYSIS, PAYMENT_ANALYSIS
} from "../actionTypes"
import { AxiosHeaders } from "axios";



export const fetchVendors = (query='') => dispatch => {
    const endpoint = VENDORS_LIST_ENDPOINT + query;
    
    axiosInstance.get(endpoint)
        .then(
            respData=> {
                const response = respData.data;
                const data = response.results.map(ele =>({
                    id: ele.id,
                    title: ele.title,
                    afm: ele.afm,
                    balance: ele.balance,
                    button: ele
                    
                }));
                return dispatch({
                    type: FETCH_VENDORS,
                    payload: {...response, results: data}
            })
        }
        )
} 

export const fetchVendor = (id) => dispatch => {
    const endpoint = `${VENDOR_DETAIL_ENDPOINT}${id}/`;

    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_VENDOR,
                    payload: respData.data
                })
            }
        )
}


export const updateVendor = (data) => dispatch => {
    const endpoint = `${VENDOR_DETAIL_ENDPOINT}${data.id}/`;
    axiosInstance.put(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: UPDATE_VENDOR,
                    payload: respData.data
                })
            }
        )
}

export const fetchInvoices = (q='') => dispatch => {
    const endpoint = INVOICE_LIST_ENDPOINT + q;
    axiosInstance.get(endpoint)
        .then(
            respData=> {
                const response = respData.data
                const data = response.results.map(ele =>({
                    id: ele.id,
                    date: ele.date,
                    title: ele.title,
                    value: ele.final_value,
                    payment_method: ele.payment_method
                
                }))
                const invoices = {...response, results: data}
                return dispatch({
                    type: FETCH_VENDOR_INVOICES,
                    payload: invoices
                })
            }
        )
}

export const deleteInvoice = (id, vendor) => dispatch =>{
    const endpoint = INVOICE_UPDATE_ENDPOINT + `${id}/`;
    axiosInstance.delete(endpoint)
        .then(
            respData=>{
                const vendor_endpoint = VENDOR_DETAIL_ENDPOINT + `${vendor}/`;
                axiosInstance.get(vendor_endpoint)
                    .then(
                        response=>{
                            return dispatch({
                                type: DELETE_VENDOR_INVOICE,
                                payload: id,
                                vendor: response.data
                            })
                        }
                    )
            }
        )
}


export const createInvoice = (data) => dispatch => {
    axiosInstance.post(INVOICE_LIST_ENDPOINT, data)
        .then(
            respData=> {
                const endpoint = `${VENDOR_DETAIL_ENDPOINT}${data.vendor}/`;
                axiosInstance.get(endpoint)
                    .then(
                        response=>{
                            return dispatch({
                                type: CREATE_VENDOR_INVOICE,
                                payload: respData.data,
                                vendor: response.data
                            })
                        }
                    )
                
            }
        )
}

export const updateInvoice = (data) => dispatch => {
    const endpoint = INVOICE_UPDATE_ENDPOINT + `${data.id}/`;
    axiosInstance.put(endpoint, data)
        .then(
            respData=>{
                const vendor_endpoint = VENDOR_DETAIL_ENDPOINT + `${data.vendor}`;
                axiosInstance.get(vendor_endpoint)
                    .then(
                        response =>{
                            dispatch({
                                type: UPDATE_VENDOR_INVOICE,
                                vendor: response.data,
                                payload: respData.data,
                            })
                        }
                    )
            }
        )
};


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


export const fetchInvoiceAnalysis = (query='') => dispatch => {
    let endpoint = VENDORS_INVOICES_ANALYSIS_ENDPOINT;
    if (query.length > 3) { endpoint = endpoint + query};
    axiosInstance.get(endpoint)
        .then(respData=>{
            const response = respData.data;
            return dispatch({
                type: INVOICE_ANALYSIS,
                payload: response
            })
        })
};

export const fetchPaymentsAnalysis = (query='') => dispatch => {
    let endpoint = VENDORS_PAYMENT_ANALYSIS_ENDPOINT;
    if (query.length >2) { endpoint = endpoint + query};
    axiosInstance.get(endpoint)
        .then(respData=>{
            const response = respData.data;
            return dispatch({
                type: PAYMENT_ANALYSIS,
                payload: response
            })
        })
}