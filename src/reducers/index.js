import recipes from './recipes';
import currentRecipe from './recipe';
import error from './error';
import fetching from './fetching';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    recipes,
    currentRecipe,
    error,
    fetching
});

export default rootReducer;