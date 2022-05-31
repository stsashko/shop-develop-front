import {LOAD_DELAY} from "../actions/types";

const initialState = {
    loading: false
}

const loadDelayReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_DELAY:
            return {
                ...state,
                loading: action.check
            }
        default:
            return state;
    }
}

export default loadDelayReducer;
