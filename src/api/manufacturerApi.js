import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const getManufacturersAllApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getManufacturers).then(({data: response}) => {

            if (response.success) {
                resolve(response);
            } else {
                reject(response.errors);
            }

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}

export const getManufacturersApi = ({page, rowsPerPage, search}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getManufacturers}/${page}`, {
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

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}




export const getManufacturerApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getManufacturer}/${id}`).then(({data: response}) => {

            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}


export const addManufacturerApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_PATH.addManufacturer}`, data).then(({data: response}) => {

            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}


export const updManufacturerApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updManufacturer}/${id}`, data).then(({data: response}) => {

            if (response.success) {
                resolve(response.data);
            } else {
                reject(response.errors);
            }

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}

export const deleteManufacturerApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteManufacturer}/${id}`).then(({data: response}) => {

            if (response.success) {
                resolve(true);
            } else {
                reject(response.errors);
            }

            // setTimeout(() => {
            //     resolve(response.data);
            // }, 999)
        })
            .catch(error => {
                reject([error.message]);
                // reject(error?.response?.data.errors);
            });
    });
}