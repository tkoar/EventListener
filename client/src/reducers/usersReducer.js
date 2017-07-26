
export default function userReducer(state={loading: false, users: [], currentUser: {}}, action) {
  switch (action.type) {
    case 'LOADING_USERS':
      return Object.assign({}, state, {loading: true})
    case 'ALL_USERS':
      return Object.assign({}, state, {loading:false, users: action.payload})
    case 'CURRENT_USER':
      return Object.assign({}, state, {loading: false, currentUser: action.payload})
    default:
      return state
  }
}
