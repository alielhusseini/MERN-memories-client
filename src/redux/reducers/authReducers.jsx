import constants from '../constants/actionType'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case constants.auth:
            //console.log(action?.data)
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        case constants.logout:
            localStorage.clear()
            return {...state, authData: null}
        default:
            return state;
    }
}