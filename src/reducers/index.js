import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const LOAD_REQUESTS = 'LOAD_REQUESTS';
const LOAD_GAMES = 'LOAD_GAMES';

//*************************************************
const usersReducer = (state = [], action) =>{
    if (action.type === LOAD_USERS){
        state = action.users
    }

    return state;
}

//*************************************************
const requestsReducer = (state = [], action) =>{
    if (action.type === LOAD_REQUESTS){
        state = action.requests
    }

    return state;
}

//*************************************************
const gamesReducer = (state = [], action) =>{
    if (action.type === LOAD_GAMES){
        state = action.games
    }
    return state;
}


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
        // console.log(users);
        dispatch(_loadUsers(users));
    }
};

//THUNKS****************************************

const _loadRequests = (requests) =>{
    return {
        type: LOAD_REQUESTS,
        requests
    };
};

const loadRequests = () =>{
    return async(dispatch)=>{
        const requests = (await axios.get('/api/requests')).data;
        dispatch(_loadRequests(requests));
    }
};

//THUNKS****************************************

const _loadGames = (games) =>{
    return {
        type: LOAD_GAMES,
        games
    };
};

const loadGames = () =>{
    return async(dispatch)=>{
        const games = (await axios.get('/api/games')).data;
        // console.log(users);
        dispatch(_loadGames(games));
    }
};


// export default store;
export { usersReducer, requestsReducer, gamesReducer, loadUsers, loadRequests, loadGames };