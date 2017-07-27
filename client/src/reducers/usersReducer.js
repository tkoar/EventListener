
export default function userReducer(state={loading: false, users: [], currentUser: {}}, action) {
  switch (action.type) {
    case 'LOADING_USERS':
      return Object.assign({}, state, {loading: true})
    case 'ALL_USERS':
      return Object.assign({}, state, {loading:false, users: action.payload})
    case 'CURRENT_USER':
      return Object.assign({}, state, {loading: false, currentUser: action.payload})
      case 'FETCHING':
        return state
    case 'UPDATING_ICON':
      return Object.assign({}, state, {currentUser: {...state.currentUser, icon: action.payload.url}})
    default:
      return state
  }
}
