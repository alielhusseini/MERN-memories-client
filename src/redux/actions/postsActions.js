import * as api from '../../api/index'
import constants from '../constants/actionType'

// action creators are functions that return an action (object that has type & payload )
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: constants.startLoading })
        const { data } = await api.fetchPost(id)
        //console.log(data)
        dispatch({ type: constants.fetchPost, payload: data })
        dispatch({ type: constants.endLoading })
    } catch (err) {
        console.log(err.message)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: constants.startLoading })
        const { data } = await api.fetchPosts(page)
        //console.log(data)
        dispatch({ type: constants.fetchAll, payload: data })
        dispatch({ type: constants.endLoading })
    } catch (err) {
        console.log(err.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: constants.startLoading })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery) // we distructure it since the backend is sending it like this: json({ data: posts })
        dispatch({ type: constants.fetchBySearch, payload: data })
        dispatch({ type: constants.endLoading })
    } catch (err) {
        console.log(err.message)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: constants.startLoading })
        const { data } = await api.createPost(post)

        navigate(`/posts/${data._id}`)

        dispatch({ type: constants.create, payload: data })
        dispatch({ type: constants.endLoading })
    } catch (err) {
        console.log('postActions', err.message)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: constants.update, payload: data })

    } catch (err) {
        console.log(err.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: constants.delete, payload: id })

    } catch (err) {
        console.log(err.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: constants.like, payload: data })
    } catch (err) {
        console.log(err.message)
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id)
        dispatch({ type: constants.comment, payload: data })
        return data.comments
    } catch (error) {
        console.log('redux/actions/postsActions/commentPost', error)
    }
}