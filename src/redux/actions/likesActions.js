import {INCREMENT, DECREMENT} from './types'

export const incrementLikes = () => ({
    type : INCREMENT
})

export const decrementLikes = () => ({
    type : DECREMENT
})
