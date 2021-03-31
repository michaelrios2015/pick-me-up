import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, createMessage } from '../store/messages';

class Chat extends Component{
  constructor(){
    super();
    this.state = {
      socket: {},
      content: '',
      chatId: 0,
      userName: ''
    };

    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  async componentDidMount(){
    this.props.getMessages();
    // const chatId = parseFloat(window.document.location.pathname.slice(6));
    // const chatWindow = document.getElementById(this.state.chatId + '');

    // const url = window.document.location.origin.replace('http', 'ws');
    // const socket = new WebSocket(url);

    // this.setState({
    //   socket: socket,
    //   chatId: chatId,
    //   userName: this.props.userName
    // });

    // this handles receiving the message 
    // socket.addEventListener('message', (ev)=> {
    //   const message = JSON.parse(ev.data);
    //   if(message.chatId === this.state.chatId){
    //     if(message.history){
    //       message.history.forEach(_message => {
    //         const bottom = chatWindow.innerHTML;
    //         chatWindow.innerHTML = `<li>${ message.sender }<span class='date'>${ message.date }<span></li>`;
    //         chatWindow.innerHTML += bottom;
    //       });
    //     } else {
    //       const bottom = chatWindow.innerHTML;
    //       chatWindow.innerHTML = `<li>${ message.sender }: ${ message.content }<span class='date'>${ message.date }<span></li>`;
    //       chatWindow.innerHTML += bottom;
    //     };
    //   };
    // });
  };



  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  async sendMessage(ev){
    const chatWindow = document.getElementById(this.state.chatId + '');
    ev.preventDefault();
    
    
    const content = this.state.message;
    const chatId = this.state.chatId;
    const sender = this.state.userName;
    const userId = this.props.userId;
    // CHANGE DATE TO MOMENT ************************************************
    let date = new Date();
    date = (date += '').slice(0,25);
    // this puts new messages on top and pushes old messages down
    const oldMessages = chatWindow.innerHTML;
    chatWindow.innerHTML = `<li>${ sender }: ${ content }<span class='date'>${ date }</span></li>`;
    chatWindow.innerHTML += oldMessages;
    // USE THIS TO SEND MESSAGE!!!!
    this.state.socket.send(JSON.stringify({ content, chatId, date, sender }));
    this.props._createMessage({ content, chatId, date, sender, userId });
    document.getElementById('message').value = ''; 
  };


  render() {
    const { chatId } = this.state;
    const { messages } = this.props;
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
        {/* <div>
          <ul id={ chatId + '' }>
            { 
              messages.map(message => {
                return (
                  <li key=''>{ message.sender }: { message.content }<span class='date'>{ message.date }</span></li>
                )
              })
            }

          </ul>
        </div> */}
      </div>
    );
  };
};

const mapState = ({ games, users, messages }) => {
  return {
    games: games.open,
    user: users.single,
    messages: messages
  }
};

const mapDispatch = dispatch => {
  return {
    _createMessage: (message) => dispatch(createMessage(message)),
    getMessages: () => dispatch(getMessages())
  }
}

export default connect(mapState, mapDispatch)(Chat)
