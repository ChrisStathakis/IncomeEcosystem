import { CREATE_VENDOR_INVOICE, CREATE_VENDOR_PAYMENT, FETCH_VENDOR, FETCH_VENDORS, 
    FETCH_VENDOR_INVOICES, FETCH_VENDOR_PAYMENTS, DELETE_VENDOR_INVOICE, UPDATE_VENDOR, UPDATE_VENDOR_INVOICE } from '../actionTypes';

const initialState  = {
    vendors: [],
    vendor: { },
    payments: [],
    invoices: []
}


export default function vendorReducers(state=initialState, action){
    let new_invoices = [];
    switch(action.type){

        case FETCH_VENDORS:
            return {
                ...state,
                vendors: action.payload
            }

        case FETCH_VENDOR:
            return {
                ...state,
                vendor: action.payload
            }

        case FETCH_VENDOR_INVOICES:
            return {
                ...state,
                invoices: action.payload
            }
        
        case CREATE_VENDOR_INVOICE:
            const new_invoices_list = [action.payload, ...state.invoices.results, ]
            new_invoices = {
                ...state.invoices,
                results: new_invoices_list,
            } 
            return {
                ...state,
                invoices: new_invoices,
                vendor: action.vendor
            }
        
        case UPDATE_VENDOR_INVOICE:
            const result = {
                id: action.payload.id,
                date:action.payload.date,
                title: action.payload.title,
                value: action.payload.value, 
                payment_method: action.payload.payment_method }
            const modify_results = state.invoices.results.map(item => item.id === action.payload.id ? result : item);
            new_invoices = {...state.invoices, results: modify_results}
            console.log('modify', modify_results)
            return {
                ...state,
                vendor: action.vendor,
                invoices: new_invoices
            }

        case DELETE_VENDOR_INVOICE:
            const results = state.invoices.results.filter(ele=> ele.id !== action.payload)
            const invoices = {...state.invoices, results: results}
            return {
                ...state,
                invoices: invoices,
                vendor: action.vendor
            }

        case FETCH_VENDOR_PAYMENTS:

            return {
                ...state,
                payments: action.payload
            }
       
        
        default:
            return state

    }
}