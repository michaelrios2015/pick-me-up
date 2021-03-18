import axios from 'axios';

// can I just add a wins game here??
const LOAD_GAMES = 'LOAD_GAMES';
const LOAD_CLOSED_GAMES = 'LOAD_GAMES';
const CREATE_GAME = 'CREATE_GAME';
const DESTROY_GAME = 'DESTROY_GAME';
const UPDATE_GAME = 'UPDATE_GAME';


//*************************************************
const intialState = {open: [], closed: []}

const gamesReducer = (state = intialState, action) =>{
    if (action.type === LOAD_GAMES){
        state.open = action.games
    }
    if (action.type === LOAD_CLOSED_GAMES){
        state.closed = action.games
    }
    if (action.type === CREATE_GAME){
        state.open = [...state, action.game]
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

const _loadClosedGames = (games) =>{
    return {
        type: LOAD_CLOSED_GAMES,
        games
    };
};


const _createGame = (game) => {
    return {
        type: CREATE_GAME,
        game
    }
}

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

export const loadClosedGames = () =>{
    return async(dispatch)=>{
        const games = (await axios.get('/api/games/closed')).data;
        //can add a filter to check if user is in game 
        dispatch(_loadClosedGames(games));
    }
};

export const createGame = () => {
    return async(dispatch) => {
        const game = (await axios.post('/api/games')).data;
        dispatch(_createGame(game));
    }
}


// export default store;
export { gamesReducer };