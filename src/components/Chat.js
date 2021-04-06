import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, createMessage } from '../store/messages';
import moment from 'moment';

class Chat extends Component{
  constructor(){
    super();
    this.state = {
      gameId: 0,
      chatId: 0,
      content: '',
      sender: ''
    };

    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  async componentDidMount(){
    const { gameId } = this.props.location.state;
    this.props.getMessages(gameId);
    const chatId = window.location.hash.slice(7);
    
    this.setState({
      gameId: gameId,
      chatId: chatId,
      sender: this.props.user.name,
    });
  };



  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  async sendMessage(ev){
    ev.preventDefault();
    
    const { content, gameId, chatId, sender } = this.state;
    const userId = this.props.user.id;
    // CHANGE DATE TO MOMENT ************************************************
    let date = moment();;
    
    // this is storing the message in the db
    this.props._createMessage({ content, gameId, date, userId });
    
    // this puts new messages on top and pushes old messages down
    // const oldMessages = chatWindow.innerHTML;
    // chatWindow.innerHTML = `<li>${ sender }: ${ content }<span>${ date }</span></li>`;
    // chatWindow.innerHTML += oldMessages;

    // this is clearing the text from the form box after sending message
    document.getElementById('content').value = ''; 
    
  };


  render() {
    const { gameId } = this.state;
    const { user, messages } = this.props;
    const { sendMessage, handleChange } = this;

    return (
      <div className='container'>
        <div >
          <form onSubmit={ sendMessage } >
            <label htmlFor='content'></label>
            <input type='text' onChange={ handleChange } id='content' name='content' /><br/>
            <button type='submit'>Send</button>
          </form>
        </div>
        <div>
          <ul id={ gameId + '' }>
            { 
              messages.map(message => {
                return (
                  <li key={message.id}>{ message.user.name }: { message.content }<span>{ message.date }</span></li>
                )
              })
            }
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
    getMessages: (gameId) => dispatch(getMessages(gameId))
  }
}

export default connect(mapState, mapDispatch)(Chat)
