import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import {logger, createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import { usersReducer } from './users'
import { requestsReducer } from './requests'
import { gamesReducer } from './games'

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
export * from './requests'
export * from './games'
export * from './users'
