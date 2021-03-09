import axios from 'axios';

const LOAD_REQUESTS = 'LOAD_REQUESTS';
const CREATE_REQUEST = 'CREATE_REQUEST';
const DESTROY_REQUEST = 'DESTROY_REQUEST';
const UPDATE_REQUEST = 'UPDATE_REQUEST';


//*************************************************
const requestsReducer = (state = [], action) => {
    if (action.type === LOAD_REQUESTS){
        state = action.requests
    }

    return state;
}


//THUNKS****************************************

const _loadRequests = (requests) =>{
    return {
        type: LOAD_REQUESTS,
        requests
    };
};

export const loadRequests = () =>{
    return async(dispatch)=>{
        const requests = (await axios.get('/api/requests')).data;
        dispatch(_loadRequests(requests));
    }
};



// export default store;
// export { requestsReducer, loadRequests };
export { requestsReducer } 