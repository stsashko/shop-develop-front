import {INCREMENT, DECREMENT} from "../actions/types";

const initialState = {
    likes: 10,
    dislikes: 7
}

const likesReducer = (state = initialState, action) => {
    // console.log('likesReducer > ', action);


    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                likes: state.likes + 1
            }
        case DECREMENT:
            return {
                ...state,
                dislikes: (state.dislikes <= 0 ? 0 : state.dislikes - 1)
            }
        default:
            return state;
    }
}

export default likesReducer;
