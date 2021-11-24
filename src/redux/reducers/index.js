import { combineReducers } from "redux"

import postsReducers from './postsReducers'
import authReducers from './authReducers.jsx'

export default combineReducers({
    postsReducers,
    authReducers
})