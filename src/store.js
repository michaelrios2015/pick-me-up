import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { usersReducer, requestsReducer, gamesReducer } from './reducers/index'


// the reducer
const reducer = combineReducers({
    users: usersReducer,
    requests: requestsReducer,
    games: gamesReducer,
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
