import axios from 'axios'

//constants

const SET_MESSAGES = 'SET_MESSAGES';
const CREATE_MESSAGE = 'CREATE_MESSAGE';

// const initialState = {
//   messages: []
// };


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

export const getMessages = () => {
  return async (dispatch)=>{
    const messages = (await axios.get('/api/messages')).data;
    dispatch(setMessages(messages))
  }
};

export const createMessage = (message) => {
  
  return async (dispatch)=>{
    const newMessage = (await axios.post('/api/messages', message)).data;
    dispatch(postMessage(newMessage))
  }
};


//reducer

export default function messagesReducer(state=[], action) {
  if(action.type === SET_MESSAGES){
    state = action.messages 
  }
  if(action.type === CREATE_MESSAGE){
    state = [...state, action.message];
  }

  return state;
}