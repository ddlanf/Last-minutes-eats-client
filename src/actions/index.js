export const addRecipes = (recipes) => {
    return {
        type : 'ADD_RECIPES',
        payload: recipes,
    }
}

export const deleteRecipes = () => {
    return {
        type : 'DELETE_RECIPES',
    }
}

export const addCurrentRecipe = (recipe) => {
    return {
        type : 'ADD_RECIPE',
        payload: recipe,
    }
}

export const deleteCurrentRecipe = () => {
    return {
        type : 'DELETE_RECIPE',
    }
}

export const setError = (error) => {
    return {
        type : 'SET_ERROR',
        payload: error
    }
}

export const clearError = () => {
    return {
        type : 'CLEAR_ERROR',
    }
}

export const startFetch = () => {
    return {
        type : 'START_FETCH',
        payload: true,
    }
}

export const endFetch = () => {
    return {
        type : 'END_FETCH',
        payload: false,
    }
}
