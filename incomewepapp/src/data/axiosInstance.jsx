import axios from 'axios';
import { REFRESH_TOKEN_ENDPOINT, BASE_URL } from './endpoints';
import {ACCESS_TOKEN, LOGIN_FAIL, REFRESH_TOKEN, UPDATE_TOKEN} from "./actionTypes";
import { Buffer } from 'buffer';
import store from "../data/store";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 55000,
    headers: {
        'Authorization': localStorage.getItem(ACCESS_TOKEN) ? "Bearer " + localStorage.getItem(ACCESS_TOKEN): null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});



axiosInstance.interceptors.response.use(
    response => response,
    error=>{
        const originalRequest = error.config;
        if (!error.response){
            console.log('Cant find response');
            return Promise.reject({message: 'The app has failed you'})
        }

         // Prevent infinite loops early
         if (error.response.status === 401 && originalRequest.url === REFRESH_TOKEN_ENDPOINT) {
            store.dispatch({type: LOGIN_FAIL});
            console.log('refresh token 401', error.response.message);
            return Promise.reject({message: '401 Exception'});
        }
        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
        {   
            const state = store.getState()
            const refreshToken = state.authReducer.refreshToken;
            if (typeof refreshToken === 'undefined'){
                store.dispatch({type: LOGIN_FAIL});
                console.log('token not found', error.response.message);
                return Promise.reject({message: 'logout'})
            }

            if (refreshToken){

                //const tokenParts = JSON.parse(Buffer.from(refreshToken, 'base64').split('.')[1])
                const tokenParts =  Buffer.from(refreshToken, 'utf8').toString('base64');
                // const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                // exp date in token is expressed in seconds, while now() returns milliseconds:
              
                const now = Math.ceil(Date.now() / 1000);
                if (tokenParts.exp > now) {
                    return axiosInstance
                    .post(REFRESH_TOKEN_ENDPOINT, {refresh: refreshToken})
                    .then((response) => {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access);
                        axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                        store.dispatch({type: UPDATE_TOKEN, payload: response.data});
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.log('refresh update failed', err);
                        store.dispatch({type: LOGIN_FAIL})
                    });
                } else {
                    console.log('refresh update failed else');
                    store.dispatch({type: LOGIN_FAIL});
                }
            } else {
                console.log("Refresh token not available.");
                localStorage.removeItem('isAuthenticated');

            }
    }


  // specific error handling done elsewhere
  return Promise.reject(error);
}
);


export default axiosInstance;