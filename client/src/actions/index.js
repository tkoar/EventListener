import axios from 'axios'
import fetch from 'isomorphic-fetch';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'

const ROOT_URL = 'http://localhost:3000/api/v1'

export function signinUser ({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        console.log('from server on login', response)
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', response.data.token)
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signupUser ({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function fetchMessage () {
  return function (dispatch) {
    axios.get('http://localhost:3000/', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}

export function fetchEvents(dispatch) {
  return function(dispatch) {
    dispatch({type: 'LOADING_EVENTS'})
    return fetch('http://localhost:3000/api/v1/events')
      .then(res => res.json())
      .then(res => dispatch({type: 'FETCH_EVENTS', payload: res}))
  }
}

export function allUsers(dispatch) {
  return function(dispatch) {
    dispatch({type: 'LOADING_USERS'})
    return fetch('http://localhost:3000/api/v1/users')
      .then(res => res.json())
      .then(res => dispatch({type: 'ALL_USERS', payload: res}))
  }
}

export function filterEvents(dispatch) {
  return function(dispatch) {
    dispatch({type: 'LOADING_EVENTS'})
    return fetch('http://localhost:3000/api/v1/events')
      .then(res => res.json())
      .then(res => dispatch({type: 'FETCH_EVENTS', payload: res}))
  }
}

export function currentUser(currentUser) {
  return {type: 'CURRENT_USER', payload: currentUser}
}

export function updateUserIconFrontEnd(updateObj) {
  return {type: 'UPDATING_ICON', payload: updateObj}
}

export function updateUserIconBackEnd(updateObj) {
  return {type: 'FETCHING', payload:
      fetch('http://localhost:3000/api/v1/users/' + updateObj.userId, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(updateObj)
    })
  }
}

export function updateEventIconFrontEnd(updateObj) {
    const updatedEvents = updateObj.events.map(el => {
      let newEl = {...el}
      if (el.owner_id === updateObj.userId) {
        newEl.owner_icon = updateObj.url
      }
      return newEl
    })
  return {type: 'UPDATING_EVENTS', payload: updatedEvents}
}

export function updateEventIconBackEnd(updateObj) {
  const updatedEvents = updateObj.events.map(el => {
    let newEl = {...el}
    if (el.owner_id === updateObj.userId) {
      newEl.owner_icon = updateObj.url
      return newEl
    }
  }).filter(el => !!el)
  let eventObj = {events: updatedEvents}
  return {type: 'POSTING_EVENTS', payload:
      fetch('http://localhost:3000/api/v1/events', {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(eventObj)
    })
  }
}
