const initialState = [];

const recipesReducer = (state= initialState, action) =>{
    switch(action.type){
        case 'ADD_RECIPES':
            return action.payload;
        case 'DELETE_RECIPES':
            return [];
        default:
            return state;
    }
}

export default recipesReducer;