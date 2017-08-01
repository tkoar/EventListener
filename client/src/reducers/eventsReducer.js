
const eventsReducer = (state={loading: false, events: [], eventsRange: {}}, action) => {
  switch (action.type) {
    case 'LOADING_EVENTS':
      return Object.assign({}, state, {loading: true})
    case 'FETCH_EVENTS':
      return Object.assign({}, state, {loading:false, events: action.payload})
    case 'FILTERED_EVENTS':
      return Object.assign({}, state, {loading:false, events: action.payload})
    case 'UPDATING_EVENTS':
      return Object.assign({}, state, {events: action.payload})
    case 'ADD_EVENT':
      return Object.assign({}, state, {events: [...state.events, action.payload]})
    case 'POSTING_EVENTS':
      return state
    case 'DATE_RANGE':
      return Object.assign({}, state, {eventsRange: action.payload})
    default:
      return state
  }
}
export default eventsReducer
