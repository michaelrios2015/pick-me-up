import axios from 'axios';

// can I just add a wins game here??
const LOAD_GAMES = 'LOAD_GAMES';
const CREATE_GAME = 'CREATE_GAME';
const DESTROY_GAME = 'DESTROY_GAME';
const UPDATE_GAME = 'UPDATE_GAME';


//*************************************************
const gamesReducer = (state = [], action) =>{
    if (action.type === LOAD_GAMES){
        state = action.games
    }
    return state;
}

//ACTION CREATORS****************************************
const _loadGames = (games) =>{
    return {
        type: LOAD_GAMES,
        games
    };
};

//THUNKS****************************************
export const loadGames = () =>{
    return async(dispatch)=>{
        const games = (await axios.get('/api/games')).data;
        dispatch(_loadGames(games));
    }
};

export const loadOpenGames = () =>{
    return async(dispatch)=>{
        const games = (await axios.get('/api/games/open')).data;
        dispatch(_loadGames(games));
    }
};


// export default store;
export { gamesReducer };