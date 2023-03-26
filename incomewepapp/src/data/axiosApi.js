import axios from 'axios'
import { REFRESH_TOKEN_ENDPOINT, BASE_URL } from './endpoints'
import {ACCESS_TOKEN, IS_AUTHENTICATED, REFRESH_TOKEN} from "./actionTypes";



const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem(ACCESS_TOKEN) ? "JWT " + localStorage.getItem(ACCESS_TOKEN) : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        console.log('error', error.response.status);
        // Prevent infinite loops early
        if (error.response.status === 401 && originalRequest.url === REFRESH_TOKEN_ENDPOINT) {
            console.log('here!')
            window.location.href = '/login/';
            localStorage.setItem(IS_AUTHENTICATED, 'false');
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
            {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post(REFRESH_TOKEN_ENDPOINT, {refresh: refreshToken})
                        .then((response) => {

                            localStorage.setItem(ACCESS_TOKEN, response.data.access);
                            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                        localStorage.setItem(IS_AUTHENTICATED, 'false');
                    }
                }else{
                    console.log("Refresh token not available.");
                    localStorage.setItem(IS_AUTHENTICATED, 'false');
                    window.location.href = '/login/';
                }
        }


      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance