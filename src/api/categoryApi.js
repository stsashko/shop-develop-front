import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const getCategoriesAllApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getCategories).then(({data: response}) => {

            // const {data, total, per_page, current_page} = response.data;

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



export const getCategoriesApi = ({page, rowsPerPage, search}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getCategories}/${page}`, {
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




export const getCategoryApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getCategory}/${id}`).then(({data: response}) => {

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


export const addCategoryApi = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_PATH.addCategory}`, data).then(({data: response}) => {

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


export const updCategoryApi = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_PATH.updCategory}/${id}`, data).then(({data: response}) => {

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

export const deleteCategoryApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteCategory}/${id}`).then(({data: response}) => {

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