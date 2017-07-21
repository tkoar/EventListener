import { combineReducers } from 'redux'
import eventsReducer from './eventsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  eventsReducer,
  usersReducer
})

export default rootReducer
