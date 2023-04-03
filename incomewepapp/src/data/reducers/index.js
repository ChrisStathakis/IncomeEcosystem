import { combineReducers } from "redux";
import generalReducers from "./generalReducers";
import authReducer from "./authReducers";
import vendorReducers from "./vendorReducers";
import incomeReducers from "./incomeReducers"


export default combineReducers({
    authReducer,
    vendorReducers,
    generalReducers,
    incomeReducers
})