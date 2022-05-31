import {TITLE_TEXT} from "../actions/types";

const initialState = {
    titleText: ''
}

const titleReducer = (state = initialState, action) => {

    switch (action.type) {
        case TITLE_TEXT:
            return {
                ...state,
                titleText: action.value
            }
        default:
            return state;
    }
}

export default titleReducer;
