import { SET_LOADING, UNSET_LOADING } from './loaderTypes'

const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

const unsetLoading = () => {
    return {
        type: UNSET_LOADING
    }
}

export { setLoading, unsetLoading }