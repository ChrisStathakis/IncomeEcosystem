import { CREATE_VENDOR_INVOICE, CREATE_VENDOR_PAYMENT, FETCH_VENDOR, FETCH_VENDORS, 
    FETCH_VENDOR_INVOICES, FETCH_VENDOR_PAYMENTS, DELETE_VENDOR_INVOICE, UPDATE_VENDOR, UPDATE_VENDOR_INVOICE, UPDATE_PAYMENT, DELETE_PAYMENT, INVOICE_ANALYSIS } from '../actionTypes';

const initialState  = {
    vendors: [],
    vendor: { },
    payments: [],
    invoices: [],
    invoice_analysis:{
        monthly: [],
        vendors_analysis: [],
        payment_method_analysis: []
    }
}


export default function vendorReducers(state=initialState, action){
    let new_invoices = [];
    let payment = {}
    let payment_results = []

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
        
        case UPDATE_PAYMENT:
            payment = action.payload;
            payment_results = state.payments.results.map(ele=>ele.id !== payment.id ? ele : payment);
            return {
                ...state,
                payments: {
                    ...state.payments,
                    results: payment_results
                }
            }
        
            case CREATE_VENDOR_PAYMENT:
                payment = action.payload;
                payment_results = [payment, ...state.payments.results];
                return {
                    ...state,
                    payments: {
                        ...state.payments,
                        results: payment_results
                    }
                }
            
            case DELETE_PAYMENT:
                
                return {
                    ...state
                }

            case INVOICE_ANALYSIS:
                const invoice_analysis = {
                    monthly: action.payload.monthly, 
                    vendors_analysis: action.payload.vendors_analysis,
                    payment_method_analysis: action.payload.payment_method_analysis}

                return {
                    ...state,
                    invoice_analysis: invoice_analysis

                }
        
        default:
            return state

    }
}