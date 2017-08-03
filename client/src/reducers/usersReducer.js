
export default function userReducer(state={loading: false, users: [], currentUser: {}, userProfile: {}, relevantFriendIds: []}, action) {
  switch (action.type) {
    case 'LOADING_USERS':
      return Object.assign({}, state, {loading: true})
    case 'ALL_USERS':
      return Object.assign({}, state, {loading:false, users: action.payload})
    case 'CURRENT_USER':
      return Object.assign({}, state, {loading: false, currentUser: action.payload})
    case 'GET_ONE_USER':
      return Object.assign({}, state, {userProfile: action.payload})
    case 'FETCHING':
      return state
    case 'UPDATING_FRIENDS':
      let currentUserSliceIndex = state.users.indexOf(action.payload.currentUser)
      let newFriendSliceIndex = state.users.indexOf(action.payload.newFriend)
      let currentUserObj = action.payload.currentUser.friends = [...action.payload.currentUser.friends, action.payload.newFriend]
      let newFriendObj = action.payload.newFriend.friends = [...action.payload.newFriend.friends, action.payload.currentUser]
      let updatedUsers = state.users
      updatedUsers.slice(currentUserSliceIndex, 1, currentUserObj)
      updatedUsers.slice(newFriendSliceIndex, 1, newFriendObj)
      return Object.assign({}, state, {users: updatedUsers})
    case 'UPDATING_ICON':
      return Object.assign({}, state, {currentUser: {...state.currentUser, icon: action.payload.url}})
    case 'UPDATING_BIO':
      return Object.assign({}, state, {currentUser: {...state.currentUser, bio: action.payload.bio}})
    case 'RELEVANT_FRIENDS':
      return Object.assign({}, state, {relevantFriendIds: action.payload})
    case 'CLEAR_FRIEND_IDS':
      return Object.assign({}, state, {relevantFriendIds: action.payload})
    default:
      return state
  }
}
