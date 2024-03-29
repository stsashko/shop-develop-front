import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get("auth-token");

        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }

        // config.headers.common['Accept'] = 'application/json';

        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;