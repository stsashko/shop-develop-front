import {HIDE_LOADING, LOG_OUT, SET_AUTHENTICATED, SET_USER, UPDATE_PROFILE} from './types'
import {getUserApi, loginApi, logOutApi, registerApi} from '../../api/authApi'

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
            .catch(error => {
                // console.log(error);
                // dispatch(addTodoFailure(err.message));
            }).finally(() => {
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





/*
export const logOutAction = () => {
    return dispatch => {
        logOutApi()
            .then(result => {
                dispatch({type: LOG_OUT});
            })
            .catch(error => {
                // console.log(error);
                // dispatch(addTodoFailure(err.message));
            }).finally(() => {
            // dispatch(hideLoading());
        });
    }
}
*/

export const logOutAction = () => ({type: LOG_OUT});




// SET_AUTHENTICATED


/*
export const setUser = (data) => {
    return dispatch => {
        loginApi(data)
            .then(data => {
                // dispatch(addTodoSuccess(res.data));
            })
            .catch(err => {

                console.log(err);

                // dispatch(addTodoFailure(err.message));
            });

    }

    // type : SET_USER,
    // payload
}
*/
