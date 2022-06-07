import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const updProfileApi = (data) => {
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
            url: API_PATH.updProfile,
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