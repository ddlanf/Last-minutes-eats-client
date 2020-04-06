import config from '../config'

const RecipeApiService = {
    getRecipes() {
        return fetch(`${config.API_ENDPOINT}/recipes`)
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getRecipe(recipeId) {
        return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    postRecipe(newRecipe) {
      return fetch(`${config.API_ENDPOINT}/recipes`, {
        method: 'POST',
        headers: {'content-type': 'application/json'   },
        body: JSON.stringify({
          ...newRecipe
        }),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    editRecipe(recipeId, recipeToUpdate) {
      return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...recipeToUpdate
        }),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    deleteRecipe(recipeId, token) {
      return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': `token ${token}`,  }
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
}

export default RecipeApiService