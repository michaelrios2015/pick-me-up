import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_USERS = 'LOAD_USERS';


//segment of real data ************************
const usersReducer = (state = [], action) =>{
    if (action.type === LOAD_USERS){
        state = action.users
    }

    return state;
}


// the reducer
const reducer = combineReducers({
    users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


//THUNKS****************************************

const _loadUsers = (users) =>{
    return {
        type: LOAD_USERS,
        users
    };
};

const loadUsers = () =>{
    return async(dispatch)=>{
        const users = (await axios.get('/api/users')).data;
        dispatch(_loadUsers(users));
    }
};

export default store;
export { loadUsers };