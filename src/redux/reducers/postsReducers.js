import constants from '../constants/actionType'

export default (state = { isLoading: true, posts: [] }, { type, payload }) => {
    switch (type) {
        case constants.startLoading:
            return { ...state, isLoading: true }
        case constants.endLoading:
            return { ...state, isLoading: false }
        case constants.fetchPost:
            return { ...state, post: payload }
        case constants.fetchAll:
            return { ...state, posts: payload.data, currentPage: payload.currentPage, numberOfPages: payload.numberOfPages }
        case constants.create:
            return { ...state, posts: [...state.posts, payload] }
        case constants.update:
        case constants.like:
            return { ...state, posts: state.posts.map(post => post._id === payload._id ? payload : post) }
        case constants.delete:
            return { ...state, posts: state.posts.filter(post => post._id !== payload) }
        case constants.fetchBySearch:
            return { ...state, posts: payload }
        case constants.comment:
            return {
                ...state, posts: state.posts.map(post => {
                    // return all the other posts...
                    // change the post that just recieved a comment
                    if (post._id === payload._id) return payload
                    return post
                })
            }
        default:
            return state
    }
}