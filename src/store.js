import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_USER = 'LOAD_USER';


//segment of real data ************************
const userReducer = (state = [], action) =>{
    if (action.type === LOAD_USER){
        state = action.user
    }

    return state;
}


// the reducer
const reducer = combineReducers({
    user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


//THUNKS****************************************

const _loadUser = (user) =>{
    return {
        type: LOAD_USER,
        user
    };
};

const loadUser = () =>{
    return async(dispatch)=>{
        const data = (await axios.get('/api/users')).data;
        dispatch(_loadUser(user));
    }
};

export default store;
export { loadUser };