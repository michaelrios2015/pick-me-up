import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, createMessage } from '../store/messages';

class Chat extends Component{
  constructor(){
    super();
    this.state = {
      socket: {},
      content: '',
      gameId: 0,
      userName: ''
    };

    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  async componentDidMount(){
    this.props.getMessages();
    // this should be based on game that this chat was accessed through *******************
    const gameId = parseFloat(window.document.location.pathname.slice(6));
    const chatWindow = document.getElementById(this.state.gameId + '');


    const url = window.document.location.origin.replace('http', 'ws');
    const socket = new WebSocket(url);
    
    this.setState({
      socket: socket,
      gameId: 1,
      userName: this.props.user.name
    });

    

    // this handles receiving the message 
    socket.addEventListener('message', (ev)=> {
      const message = JSON.parse(ev.data);

      if(message.gameId === this.state.gameId){
        if(message.socket !== this.state.socket){
          // message.forEach(_message => {
            const bottom = chatWindow.innerHTML;
            chatWindow.innerHTML = `<li>${ message.sender }: ${ message.content }<span class='date'>${ message.date }<span></li>`;
            chatWindow.innerHTML += bottom;
          // });
        } 
        // else {
        //   const bottom = chatWindow.innerHTML;
        //   chatWindow.innerHTML = `<li>${ message.sender }: ${ message.content }<span class='date'>${ message.date }<span></li>`;
        //   chatWindow.innerHTML += bottom;
        // };
      };
    });
  };



  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  async sendMessage(ev){
    const chatWindow = document.getElementById(this.state.gameId + '');
    ev.preventDefault();
    
    
    const content = this.state.message;
    const gameId = this.state.gameId;
    const sender = this.state.userName;
    const userId = this.props.userId;
    const socket = this.state.socket;
    // CHANGE DATE TO MOMENT ************************************************
    let date = new Date();
    date = (date += '').slice(0,25);
    
    // USE THIS TO SEND MESSAGE!!!!
    this.state.socket.send(JSON.stringify({ content, gameId, date, sender, socket }));
    
    // this is storing the message in the db
    this.props._createMessage({ content, gameId, date, userId });
    
    // this puts new messages on top and pushes old messages down
    const oldMessages = chatWindow.innerHTML;
    chatWindow.innerHTML = `<li>${ sender }: ${ content }<span>${ date }</span></li>`;
    chatWindow.innerHTML += oldMessages;
    // this is clearing the text from the form box after sending message
    document.getElementById('message').value = ''; 
    
  };


  render() {
    const { gameId } = this.state;
    const { user } = this.props;
    const { sendMessage, handleChange } = this;
    
    return (
      <div className='container'>
        <div >
          <form onSubmit={ sendMessage } >
            <label htmlFor='message'></label>
            <input type='text' onChange={ handleChange } id='message' name='message' /><br/>
            <button type='submit'>Send</button>
          </form>
        </div>
        <div>
          <ul id={ gameId + '' }>
            {/* { 
              messages.map(message => {
                return (
                  <li key={message.id}>{ message.sender }: { message.content }<span>{ message.date }</span></li>
                )
              })
            } */}

          </ul>
        </div>
      </div>
    );
  };
};

const mapState = ({ users, messages }) => {
  return {
    user: users.single,
    messages
  }
};

const mapDispatch = dispatch => {
  return {
    _createMessage: (message) => dispatch(createMessage(message)),
    getMessages: () => dispatch(getMessages())
  }
}

export default connect(mapState, mapDispatch)(Chat)
