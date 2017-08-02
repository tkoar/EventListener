
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
    case 'REMOVE_EVENT':
      let newEventsArr = state.events
      let event = state.events.filter(e => e.id === action.payload.id)[0]
      let eventIdx = newEventsArr.indexOf(event)
      newEventsArr.splice(eventIdx, 1)
        return Object.assign({}, state, {events: newEventsArr})
    case 'SUBMIT_COMMENT':
      let newEvents = state.events
      let currentEvent = state.events.filter(e => e.id === action.payload.event_id)[0]
      let eventIndex = newEvents.indexOf(currentEvent)
      currentEvent.comments.push(action.payload)
      let updatedEvent = currentEvent
      newEvents.splice(eventIndex, 1, updatedEvent)
        return Object.assign({}, state, {events: newEvents})
    case 'POSTING_EVENTS':
      return state
    case 'DATE_RANGE':
      return Object.assign({}, state, {eventsRange: action.payload})
    default:
      return state
  }
}
export default eventsReducer
