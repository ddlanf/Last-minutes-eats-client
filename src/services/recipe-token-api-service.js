import config from '../config'

const RecipeTokenApiService = {
    checkRecipeToken(recipeToken, recipeId){

        return fetch(`${config.API_ENDPOINT}/recipe-tokens/${recipeId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization' : `token ${recipeToken}`
            },
        })
            .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    postRecipeToken(recipeToken){

        return fetch(`${config.API_ENDPOINT}/recipe-tokens`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                ...recipeToken
              })
        })
            .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
}

export default RecipeTokenApiService