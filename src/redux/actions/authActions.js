import {HIDE_LOADING, LOG_OUT, SET_AUTHENTICATED, SET_USER} from './types'
import {getUserApi, registerApi} from '../../api/authApi'

export const setUserAction = (payload) => ({
    type: SET_USER,
    payload
})

export const setAuthenticated = () => ({
    type: SET_AUTHENTICATED
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

export const getUserAction = () => {
    return dispatch => {
        getUserApi()
            .then(result => {
                dispatch(setUserAction(result));
                dispatch(setAuthenticated());
            })
            .catch(error => {}).finally(() => {
            dispatch(hideLoading());
        });
    }
}

export const registerAction = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            registerApi(data)
                .then((user) => {

                    dispatch(setUserAction(user));
                    dispatch(setAuthenticated());

                    resolve(user);
                }).catch((error) => {
                reject(error);
            });
        });
    }
}

export const logOutAction = () => ({type: LOG_OUT});