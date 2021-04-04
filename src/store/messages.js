import axios from 'axios'

//constants

const SET_MESSAGES = 'SET_MESSAGES';
const CREATE_MESSAGE = 'CREATE_MESSAGE';

// sets up socket on client side
const socket = new WebSocket(window.document.location.origin.replace('http', 'ws'));

// this handles received messsages
socket.addEventListener('message', (ev)=> {
  try{
    const action = JSON.parse(ev.data);
    if(action.type){
      messagesReducer(action)
    }
  }
  catch(ex){
    console.log(ex);
  }
})

//action creators

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages
  }
};

export const postMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    message
  }
};



//thunks

export const getMessages = (gameId) => {
  return async (dispatch)=>{
    const messages = (await axios.get(`/api/messages/${ gameId }`)).data;
    dispatch(setMessages(messages))
  }
};

// this handles creating message in the db, adding to state, and broadcasting message to other useres
export const createMessage = (message) => {
  console.log(message)
  return async (dispatch)=>{
    const createdMessage = (await axios.post('/api/messages', message)).data;
    const action = postMessage(createdMessage);
    dispatch(action);
    socket.send(JSON.stringify(action));
  }
};


//reducer

const messagesReducer = (state=[], action) => {
  if(action.type === SET_MESSAGES){
    state = action.messages 
  }
  if(action.type === CREATE_MESSAGE){
    // this is filtering out duplicate messages for user that sends a new message
    if(!state.find(message => message.id === action.message.id)){
      state = [...state, action.message];
    }
  }

  return state;
}

// export default store;
export { messagesReducer };