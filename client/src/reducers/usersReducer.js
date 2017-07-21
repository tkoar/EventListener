
export default function userReducer(state={loading: false, users: []}, action) {
  switch (action.type) {
    case 'LOADING_USERS':
      return Object.assign({}, state, {loading: true})
    case 'FETCH_USERS':
      return Object.assign({}, state, {loading:false, users: action.payload})
    default:
      return state
  }
}
