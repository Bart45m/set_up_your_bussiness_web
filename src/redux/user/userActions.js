import { SET_USER, UNSET_USER } from './userTypes'

const setUser = (user = {}) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const unsetUser = () => {
    return {
        type: UNSET_USER
    }
}

export { setUser, unsetUser }