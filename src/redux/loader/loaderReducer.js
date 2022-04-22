import { SET_LOADING, UNSET_LOADING } from './loaderTypes'

const initialState = {
    isLoading: false
}

const loaderReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_LOADING: return {
            ...state,
            isLoading: true
        }

        case UNSET_LOADING: return {
            ...state,
            isLoading: false
        }

        default: return state
    }
}

export default loaderReducer