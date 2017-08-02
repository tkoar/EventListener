
const commentsReducer = (state={comments: []}, action) => {
  switch (action.type) {
    case 'SUBMIT_COMMENT':
      return Object.assign({}, state, {comments: [...state.comments, action.payload]})
    case 'REMOVE_COMMENT':
      return Object.assign({}, state, {loading:false, events: action.payload})
    default:
      return state
  }
}
export default commentsReducer
