import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const getStoresAllApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getStores).then(({data: response}) => {
            if (response.success) {
                resolve(response);
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const getStoresApi = ({page, rowsPerPage, search}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getStores}/${page}`, {
            params:{
                rowsPerPage,
                search
            }
        }).then(({data: response}) => {
            const {data, total, per_page, current_page} = response.data;
            if (response.success) {
                resolve({
                    data, total, per_page, current_page
                });
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const getStoreApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getStore}/${id}`).then(({data: response}) => {
            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const addStoreApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_PATH.addStore}`, data).then(({data: response}) => {
            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const updStoreApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updStore}/${id}`, data).then(({data: response}) => {
            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const deleteStoreApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteStore}/${id}`).then(({data: response}) => {
            if (response.success) {
                resolve(true);
            } else {
                reject(response.errors);
            }
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}