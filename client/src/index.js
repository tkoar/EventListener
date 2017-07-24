import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import './semantic/dist/semantic.min.css';
import './App.css'
import App from './App';
import { AUTH_USER} from './actions/types'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index.js'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk)))

const token = localStorage.getItem('token')
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state to authenticated=true
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
