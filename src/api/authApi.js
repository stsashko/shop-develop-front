import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";
import Cookies from "js-cookie";


export const loginApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(API_PATH.login, {
            email: data.email,
            password: data.password
        })
            .then(({data: response}) => {
                if(response.success) {
                    if(response?.access_token)
                        Cookies.set('auth-token', response.access_token,  { expires: data.remember ? 365 : null });
                    resolve(response.data);
                }
                else {
                    Cookies.remove("auth-token");
                    reject(response.errors);
                }
            })
            .catch(error => {
                Cookies.remove("auth-token");
                reject([error.message]);
            });

    });
}

export const registerApi = (data) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if(key === 'file')
                formData.append("file", value[0]);
            else if(value)
                formData.append(key, value);
        }

        axios({
            method: "post",
            url: API_PATH.register,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(({data: response}) => {
                if(response.success) {
                    if(response?.access_token)
                        Cookies.set('auth-token', response.access_token);
                    resolve(response.data);
                }
                else {
                    Cookies.remove("auth-token");
                    reject(response.errors);
                }
            })
            .catch(error => {
                Cookies.remove("auth-token");
                reject([error.message]);
            });
    });
}

export const getUserApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getUser)
            .then(({data: response}) => {
                if(response.success) {
                    resolve(response.data);
                }
                else {
                    reject(response.errors);
                }
            })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const logOutApi = () => {
    return new Promise((resolve, reject) => {
        axios.post(API_PATH.logOut, {})
            .then(({data: response}) => {
                if(response.success) {
                    Cookies.remove("auth-token");
                    resolve(response.data);
                }
                else {
                    reject(response.errors);
                }
            })
            .catch(error => {
                reject([error.message]);
            });
    });
}