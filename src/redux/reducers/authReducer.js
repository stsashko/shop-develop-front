import {HIDE_LOADING, SET_AUTHENTICATED, LOG_OUT, SET_USER, UPDATE_PROFILE} from "../actions/types";

const initialState = {
    loading: true,
    authenticated: false,
    user: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            let {id, name, email, avatar, role} = action.payload;
            return {
                ...state,
                user: {id, name, email, avatar, role}
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case HIDE_LOADING:
            return {
                ...state,
                loading: false
            }
        case LOG_OUT:
            return {
                ...state,
                authenticated: false,
                user: {}
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                user: {id: state.user.id, ...action.payload}
            }
        default:
            return state;
    }
}

export default authReducer;