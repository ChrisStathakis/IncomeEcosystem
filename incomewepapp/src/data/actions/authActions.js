import axioInstance from "../axiosInstance";
import {LOGIN_SUCCESS, UPDATE_TOKEN, LOGOUT, LOGIN_FAIL, REFRESH_TOKEN} from "../actionTypes";
import { TOKEN_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from "../endpoints";


export const loginAction = data => dispatch => {
    axioInstance.post(TOKEN_ENDPOINT, data)
        .then(
            respData=>{
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: respData.data
                });
                return Promise.resolve()
            },
            error => {
                const message = 'Problem';
                dispatch({
                    type: LOGIN_FAIL,
                    payload: message
                });
                return Promise.reject()
            }
        )
};


export const logoutAction = () => dispatch => {
    return dispatch({
        type: LOGIN_FAIL
    })
}