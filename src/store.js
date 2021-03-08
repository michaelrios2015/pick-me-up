import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import {logger, createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import { usersReducer, requestsReducer, gamesReducer } from './reducers/index'


// the reducer
const reducer = combineReducers({
    users: usersReducer,
    requests: requestsReducer,
    games: gamesReducer,
})
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);


export default store;
