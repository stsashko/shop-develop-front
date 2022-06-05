import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";


export const getUsersApi = ({page, rowsPerPage, search, role}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getUsers}/${page}`, {
            params:{
                rowsPerPage,
                search,
                role
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




export const getUserApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_PATH.getUser}/${id}`).then(({data: response}) => {

            if (response.success) {
                resolve({
                    ...response.data,
                    role: response.data['role'].toString()
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



export const addUserApi = (data) => {

    return new Promise((resolve, reject) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            if(key === 'avatar')
                formData.append("avatar", value[0]);
            else if(value.toString()) {
                formData.append(key, value);
            }
        }

        axios({
            method: "post",
            url: `${API_PATH.addUser}`,
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


export const updUserApi = (id, data) => {

    return new Promise((resolve, reject) => {

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if(key === 'avatar')
                formData.append("avatar", value[0]);
            else if(value.toString())
                formData.append(key, value);
        }

        axios({
            method: "post",
            url: `${API_PATH.updUser}/${id}`,
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


export const deleteUserApi = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_PATH.deleteUser}/${id}`).then(({data: response}) => {

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


