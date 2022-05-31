import {UPDATE_PROFILE} from './types'
import {getUserApi, loginApi, logOutApi} from '../../api/authApi'
import {updProfileApi} from "../../api/profileApi";
import {hideLoading, setAuthenticated, setUserAction} from "./authActions";
import axios from "../../api/axiosInstance";
import {API_PATH} from "../../api/apiConstants";


export const getUserAction = () => {
    return dispatch => {
        getUserApi()
            .then(result => {
                dispatch(setUserAction(result));
                dispatch(setAuthenticated());
            })
            .catch(error => {
                // console.log(error);
                // dispatch(addTodoFailure(err.message));
            }).finally(() => {
            dispatch(hideLoading());
        });
    }
}


export const updateProfileAction = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            updProfileApi(data)
                .then(({name, email, avatar}) => {
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: {name, email, avatar}
                    });
                    resolve(data);
                }).catch((error) => {
                reject(error);
            });
        });
    }
}
