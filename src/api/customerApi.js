import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const getCustomersApi = ({page, rowsPerPage, search}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getCustomers}/${page}`, {
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

export const getCustomerApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getCustomer}/${id}`).then(({data: response}) => {

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


export const addCustomerApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_PATH.addCustomer}`, data).then(({data: response}) => {

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


export const updCustomerApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updCustomer}/${id}`, data).then(({data: response}) => {

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

export const deleteCustomerApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteCustomer}/${id}`).then(({data: response}) => {

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



export const findCustomerApi = (search) => {

    return new Promise((resolve, reject) => {

        axios.get(API_PATH.findCustomer, {
            params: {
                search
            }
        })
            .then(({data: response}) => {
                if(response.success) {
                    resolve(response.data);
                }
                else {
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