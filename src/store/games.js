import axios from 'axios';

// can I just add a wins game here??
const LOAD_GAMES = 'LOAD_GAMES';
const LOAD_CLOSED_GAMES = 'LOAD_CLOSED_GAMES';
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
  return {...state};
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


export const loadClosedGamesForUser = (userId) =>{
  return async(dispatch)=>{
    const games = (await axios.get('/api/games/closed')).data;
    //can add a filter to check if user is in game 
    
    let gamesForUser = []

    //sure this can be done with less code
    for (let i = 0; i<games.length; i++){
      if (games[i].finalScore !== null){
          for (let j = 0; j < games[i].users.length; j++){
          if (games[i].users[j].id === userId){
              gamesForUser.push(games[i])
          }
      }
    }
  }  

   dispatch(_loadClosedGames(gamesForUser));
  }
};

export const loadOpenGamesForUser = (userId)=> {
  return async(dispatch)=> {
    const games = (await axios.get('/api/user_games/open/:userId')).data;
    dispatch(_loadGames(games));
  }
}

export const createGame = () => {
  return async(dispatch) => {
    const game = (await axios.post('/api/games')).data;
    dispatch(_createGame(game));
  }
}


// export default store;
export { gamesReducer };