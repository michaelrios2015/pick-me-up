import React, { Component } from 'react';
import { connect } from 'react-redux';


export class MyProfile extends Component{
  constructor(props) {
		super(props);
		this.state = {
			email: this.props.user ? this.props.user.email : '',
			name: this.props.user ? this.props.user.name : '' ,
			age: this.props.user ? this.props.user.age : '' ,
      height: this.props.user ? this.props.user.height : '',
      description: this.props.user ? this.props.user.description : '',
      photo: this.props.user ? this.props.user.photo : ''
      
		}
		this.onChange = this.onChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	// 	// this.handleDestroy = this.handleDestroy.bind(this);
  }
  async handleSubmit(e, user) {
    console.log(e)
    
    //console.log(e.target[0].defaultValue)
    //console.log(e.target[1].defaultValue);
    if(e.target[0].defaultValue !== ""){
    user.email = e.target[0].defaultValue;  
    }
    if(e.target[1].defaultValue !== ""){
    user.name = e.target[1].defaultValue;
    }
    if(e.target[2].defaultValue !== ""){
    user.height = e.target[2].defaultValue;
    }
    if(e.target[3].defaultValue !== ""){
    user.description = e.target[3].defaultValue;
    }
    if(e.target[4].defaultValue !== ""){
    user.photo = e.target[4].defaultValue;
    }
    //console.log(user);
    
    e.preventDefault();
    this.setState({
      ...user
    })
    
    //TODO : perform some sort of update to selected user through redux thunks
    //await axios.update("/user/:id", {...this.state})
    
	}
  async onChange(e) {
     console.log("TARGET VALUE", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
     console.log("AFTER SETSTATE", this.state.email);
		
	}

  //Eventually, clicking on MyProfile on the navbar
  //Will send in user information to my component as props from the user who is logged in

  render(){
   
    const { user } = this.props;
    const { email, name, age, height, description, photo } = this.state;
    return (
        <div className='container'>
          <div> 
          <h2 className='display-1 text-dark text-center'>Update My Profile</h2>
          <form onSubmit={(e) => this.handleSubmit(e, user)} >
            <div className='form-group'>
            <label htmlFor="email">Current Email : {user.email}</label>
            <hr />
            <label> New Email : </label>
            <input
							className='form-control'
							name="email"
							value={email}
              onChange={(e) => this.onChange(e)}
						/>
            <hr />
            </div>
            <div className='form-group'>
            <label htmlFor="name">Current Name : {user.name}</label>
            <hr />
            <label> New Name : </label>
            <input
							className='form-control'
							name="name"
							value={name}
              onChange={(e) => this.onChange(e)}
						/>
            <hr />
            </div>
            <div className='form-group'>
            <label htmlFor="age"> Age : {user.age}</label>
            <hr />
            </div>
            <div className='form-group'>
            <label htmlFor="height"> Height : {user.height}</label>
            <hr />
            <label> Updated Height : </label>
            <input
							className='form-control'
							name="height"
							value={height}
              onChange={(e) => this.onChange(e)}
						/>
            <hr />
            </div>
            <div className='form-group'>
            <label htmlFor="description"> Description : {user.description}</label>
            <hr />
            <label> Update Description : </label>
            <input
							className='form-control'
							name="description"
							value={description}
              onChange={(e) => this.onChange(e)}
						/>
            <hr />
            </div>
            <div className='form-group'>
            <label htmlFor="photo"> Current Photo : <img style={{ height:"100px", width:"100px" }} src={user.photo}></img> </label>
            <hr />
            <label> New Photo : </label>
            <input
							className='form-control'
							name="photo"
							value={photo}
              onChange={(e) => this.onChange(e)}
						/>
            <hr />
            </div>                    
          <div id='user-form-buttons'>
						<button
							type='submit'
							className='btn btn-primary'
              >
							Submit Update </button>
					
					</div>
          </form>
          
          </div>
        </div>
    );
  }
}

const mapState = ({users}) => {
  const user = users.find( user => user.id === 11 ) || false;
  return{
    user
  }
};


export default connect(mapState)(MyProfile);

1