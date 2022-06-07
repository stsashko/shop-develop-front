import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const getProductsApi = ({page, order, orderBy, rowsPerPage, search, category_id, manufacturer_id}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getProducts}/${page}`, {
            params:{
                order,
                orderBy,
                rowsPerPage,
                search,
                category_id,
                manufacturer_id
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

export const getProductApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getProduct}/${id}`).then(({data: response}) => {
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

export const addProductApi = (data) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if(key === 'image')
                formData.append("image", value[0]);
            else if(value)
                formData.append(key, value);
        }
        axios({
            method: "post",
            url: `${API_PATH.addProduct}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
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

export const updProductApi = (id, data) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if(key === 'image')
                formData.append("image", value[0]);
            else if(value)
                formData.append(key, value);
        }
        axios({
            method: "post",
            url: `${API_PATH.updProduct}/${id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
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

export const findProductApi = (search) => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.findProduct, {
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
            })
            .catch(error => {
                reject([error.message]);
            });
    });
}

export const deleteProductApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteProduct}/${id}`).then(({data: response}) => {
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