import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const basicStatisticApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.getBasicStatistic).then(({data: response}) => {
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