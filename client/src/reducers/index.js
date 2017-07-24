import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './auth_reducer'
import eventsReducer from './eventsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  events: eventsReducer,
  usersReducer
})

export default rootReducer
