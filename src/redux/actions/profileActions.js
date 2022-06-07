import {UPDATE_PROFILE} from './types'
import {updProfileApi} from "../../api/profileApi";

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