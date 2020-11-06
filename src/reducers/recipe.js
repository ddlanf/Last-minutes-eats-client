const initialState = {};

const currentRecipeReducer = (state= initialState, action) =>{
    switch(action.type){
        case 'ADD_RECIPE':
            return action.payload;
        case 'DELETE_RECIPE':
            return [];
        default:
            return state;
    }
}

export default currentRecipeReducer;