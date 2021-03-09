import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const CREATE_USER = 'CREATE_USER';
const DESTROY_USER = 'DESTROY_USER';
const UPDATE_USER = 'UPDATE_USER';

//*************************************************
const usersReducer = (state = [], action) =>{
    if (action.type === LOAD_USERS){
        state = action.users
    }
    // these thre have yet to be tested LOAD_USER works fine
    if (action.type === CREATE_USER){
        state = [...state, action.user]
    }
    if (action.type === DESTROY_USER){
        state = state.filter(user => user.id !== action.user.id);
    }
    if (action.type === UPDATE_USER){
        state = state.map(user => user.id !== action.user.id ? user : action.user);
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

export const loadUsers = () =>{
    return async(dispatch)=>{
        const users = (await axios.get('/api/users')).data;
        // console.log(users);
        dispatch(_loadUsers(users));
    }
};

const _createUser = (user) =>{
    return {
        type: CREATE_USER,
        user
    };
};

// just the generic structure not actually working
export const createUser = (data, history)=>{
    return async(dispatch)=>{
        let user = (await axios.post('/api/users', { data })).data;
        dispatch(_createUser(user));
        history.push(`/user/${user.id}`)
    }
}


//might want to stop people from completely deleting the account as it will mess up 
// the records of the games they have played, not really sure
const _destroyUser = user =>({ type: DESTROY_USER, user});

export const destroyUser = (user, history)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/users/${user.id}`)
        dispatch(_destroyUser(user))
        history.push('/users')
    }
}

const _updateUser = user =>({ type: UPDATE_USER, user});

export const updateUser = ( data )=>{
    return async(dispatch)=>{
        const user = (await axios.put(`/api/user/${id}`, { user })).data;
        dispatch(_updateUser(user));
    }
}


export { usersReducer };