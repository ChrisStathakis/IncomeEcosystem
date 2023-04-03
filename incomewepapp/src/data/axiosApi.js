import axios from 'axios';
import { REFRESH_TOKEN_ENDPOINT, BASE_URL } from './endpoints';
import {ACCESS_TOKEN, LOGIN_FAIL, REFRESH_TOKEN, UPDATE_TOKEN} from "./actionTypes";

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

axiosInstance.interceptors.request.use(async (config) => {
  const { accessToken, refreshToken } = store.getState().auth; // assuming that the auth state in the Redux store contains both the access token and the refresh token

  // If there is an access token, add it to the request headers
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // If there is no access token, try to refresh it using the refresh token
  if (refreshToken) {
    try {
      const response = await axios.post('https://example.com/api/auth/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;

      // Update the access token in the Redux store
      store.dispatch({ type: 'UPDATE_ACCESS_TOKEN', payload: newAccessToken });

      // Add the new access token to the request headers
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return config;
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  }

  return config;
});

export default api;
