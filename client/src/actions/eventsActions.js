import fetch from 'isomorphic-fetch';

export function fetchEvents() {
  return function(dispatch) {
    dispatch({type: 'LOADING_EVENTS'})
    return fetch('http://localhost:3000/api/v1/events')
      .then(res => res.json())
      .then(resJSON => dispatch({type: 'FETCH_EVENTS', payload: resJSON.images}))
  }
}
