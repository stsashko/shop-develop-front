import {IS_SHOW_LOADER, LOAD_DATA_THUNK_EXAMPLE, CHANGE_RESOURCE} from "../actions/types";

const initialState = {
    isShowLoader: false,
    resource: '',
    data: []
}

// export const IS_SHOW_LOADER = `${moduleName}/IS_SHOW_LOADER`;
// export const LOAD_DATA_THUNK_EXAMPLE = `${moduleName}/LOAD_DATA_THUNK_EXAMPLE`;

const thunkExampleReducer = (state = initialState, action) => {

    switch (action.type) {
        case IS_SHOW_LOADER:
            return {
                ...state,
                isShowLoader: action.flag
            }
        case CHANGE_RESOURCE:
            return {
                ...state,
                resource: action.resource
            }
        case LOAD_DATA_THUNK_EXAMPLE:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

export default thunkExampleReducer;
