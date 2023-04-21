import {
    LOGIN_REQUEST,
    UPDATE_TOKEN,
    LOGIN_SUCCESS,
    LOGOUT,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    IS_AUTHENTICATED, LOGIN_FAIL
} from "../actionTypes";


const initialState = {
    accessToken: '',
    refreshToken: '',
    isAuthenticated: 'false',
    profile: null
};


export default function authReducer(state=initialState, action){

    switch(action.type){

        case LOGIN_REQUEST:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                profile:'',
            };
        
        case LOGIN_SUCCESS:
            console.log('login success', action.payload);
        
            return {
                ...state,
                isAuthenticated: 'true',
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
            };
        
        case UPDATE_TOKEN:
            
            return {
                ...state,
                accessToken: action.payload.access,
                isAuthenticated: 'true'
            };
        case LOGIN_FAIL:
            console.log('login fail reducer');
            
            return {
                isAuthenticated: 'false',
                accessToken: '',
                refreshToken: ''
            }

        case LOGOUT:
            return {
                isAuthenticated: 'false',
                accessToken: '',
                refreshToken: ''
            };
        default:
            return state;
        
    }

}