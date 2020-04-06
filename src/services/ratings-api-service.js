import config from '../config'

const RatingApiService = {
    getRatings(){
        return fetch(`${config.API_ENDPOINT}/ratings`)
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    postRating(newRating, recipeId) {
        return fetch(`${config.API_ENDPOINT}/ratings/${recipeId}`, {
          method: 'POST',
          headers: {'content-type': 'application/json'  },
          body: JSON.stringify({
            ...newRating
          }),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    }
}

export default RatingApiService