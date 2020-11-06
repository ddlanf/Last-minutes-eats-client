const initialState = false;

const fetchReducer = (state= initialState, action) =>{
    switch(action.type){
        case 'START_FETCH':
            return action.payload;
        case 'END_FETCH':
            return action.payload;
        default:
            return state;
    }
}

export default fetchReducer;