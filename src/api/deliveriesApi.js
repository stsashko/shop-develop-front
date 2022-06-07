import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";
import moment from 'moment'

export const deliveriesChartApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getDeliveriesChart).then(({data: response}) => {
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

export const getDeliveriesApi = ({page, rowsPerPage, product_name, store_id, date}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getDeliveries}/${page}`, {
            params:{
                rowsPerPage,
                product_name,
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
        })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const getDeliveryApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getDelivery}/${id}`).then(({data: response}) => {

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

export const addDeliveryApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_PATH.addDelivery}`, {...data, delivery_date: moment(data.delivery_date).format('YYYY-MM-DD')}).then(({data: response}) => {
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


export const updDeliveryApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updDelivery}/${id}`, {...data, delivery_date: moment(data.delivery_date).format('YYYY-MM-DD')}).then(({data: response}) => {
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

export const deleteDeliveryApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteDelivery}/${id}`).then(({data: response}) => {
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