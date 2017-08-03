import axios from 'axios'
import fetch from 'isomorphic-fetch';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'

const ROOT_URL = 'http://localhost:3000/api/v1'

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

export function getUserProfile(user) {
  return ({type: 'GET_ONE_USER', payload: user})
}

export function addFriendFrontEnd(friendObj) {
  return ({type: 'UPDATING_FRIENDS', payload: friendObj})
}

export function addFriendBackEnd(friendObj) {
  const updateParameters = {
    addedFriend_id: friendObj.newFriend.id,
    friendAdder_id: friendObj.currentUser.id
  }
  return {type: 'FETCHING', payload:
      fetch('http://localhost:3000/api/v1/friendship' , {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(updateParameters)
    })
  }
}

export function relevantFriendIds(friendIds) {
  return { type: "RELEVANT_FRIENDS", payload: friendIds }
}

export function deleteIdFilter() {
  return { type: "CLEAR_FRIEND_IDS", payload: [] }
}


export function dateRange(dateRange) {
  return { type: 'DATE_RANGE', payload: dateRange }
}

export function updateUserBioFrontEnd(updatedBio) {
  return {type: 'UPDATING_BIO', payload: updatedBio}
}

export function updateUserBioBackEnd(updatedBio) {
  return {type: 'FETCHING', payload:
      fetch('http://localhost:3000/api/v1/users/' + updatedBio.userId, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(updatedBio)
    })
  }
}

export function addEventFrontEnd(event) {
  return {type: 'ADD_EVENT', payload: event}
}

export function addEventBackEnd(event) {
  const eventObj = {event: event}
  return ({type: 'FETCHING', payload:
    fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(eventObj)
    })
  })
}

export function removeEventFrontEnd(event) {
  return {type: 'REMOVE_EVENT', payload: event}
}

export function removeEventBackEnd(event) {
  const eventObj = {id: event.id}
  return ({type: 'FETCHING', payload:
    fetch('http://localhost:3000/api/v1/events/' + event.id, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(eventObj)
    })
  })
}

export function submitCommentFrontEnd(commentObj) {
  return {type: 'SUBMIT_COMMENT', payload: commentObj}
}

export function submitCommentBackEnd(commentObj) {
  const comment = {comment: commentObj}
  return ({type: 'FETCHING', payload:
    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify(comment)
    })
  })
}
