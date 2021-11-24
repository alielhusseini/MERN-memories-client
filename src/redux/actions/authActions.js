import * as api from '../../api/index'
import constants from '../constants/actionType'

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: constants.auth, data })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: constants.auth, data })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}