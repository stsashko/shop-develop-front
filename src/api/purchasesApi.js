import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";
import moment from "moment";

export const purchasesChartApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getPurchasesChart).then(({data: response}) => {

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


export const getPurchasesApi = ({page, rowsPerPage, customer_id, store_id, date}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getPurchases}/${page}`, {
            params:{
                rowsPerPage,
                customer_id,
                store_id,
                date
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

export const getPurchaseApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getPurchase}/${id}`).then(({data: response}) => {

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


export const addPurchaseApi = (data) => {
    return new Promise((resolve, reject) => {

        axios.post(`${API_PATH.addPurchase}`, {...data, purchase_date: moment(data.purchase_date).format('YYYY-MM-DD')}).then(({data: response}) => {
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


export const updPurchaseApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updPurchase}/${id}`, {...data, purchase_date: moment(data.purchase_date).format('YYYY-MM-DD')}).then(({data: response}) => {

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

export const deletePurchaseApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deletePurchase}/${id}`).then(({data: response}) => {

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

