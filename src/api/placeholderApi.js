import axios from "./axiosInstance";
import {API_PATH} from "./apiConstants";

export const fetchPost = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.posts)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {

                // if (error.response) {
                //     // The request was made and the server responded with a status code
                //     // that falls out of the range of 2xx
                //     console.log(1, error.response.data);
                //     console.log(2, error.response.status);
                //     console.log(3, error.response.headers);
                // } else if (error.request) {
                //     // The request was made but no response was received
                //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //     // http.ClientRequest in node.js
                //     console.log(4, error.request);
                // } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log(5, 'Error', error.message);
                // }
                //

                // console.log();

                // console.log(error?.response);


                reject(error.message);




                // reject(error?.response?.data.errors);
            });
    });
}

export const fetchComments = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.comments)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {
                reject(error?.response?.data.errors);
            });
    });
}


export const fetchAlbums = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.albums)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {
                reject(error?.response?.data.errors);
            });
    });
}


export const fetchPhotos = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.photos)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {
                reject(error?.response?.data.errors);
            });
    });
}


export const fetchTodos = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.todos)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {
                reject(error?.response?.data.errors);
            });
    });
}


export const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_PATH.users)
            .then((response) => {
                resolve(response.data);
                // setTimeout(() => {
                //     resolve(response.data);
                // }, 999)
            })
            .catch(error => {
                reject(error?.response?.data.errors);
            });
    });
}

