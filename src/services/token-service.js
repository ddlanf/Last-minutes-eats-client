import config from '../config'

const TokenService = {
  saveEmailToken(token) {
    window.localStorage.setItem(config.EMAIL_SUBMITTED, token)
  }, 
  saveRatingToken(recipeId, rating) {
    const tokenName = `recipe${recipeId}`
    window.localStorage.setItem(tokenName, rating)
  }, 
  getEmailToken() {
    return window.localStorage.getItem(config.EMAIL_SUBMITTED)
  },
  getRatingToken(recipeId) {
    const tokenName = `recipe${recipeId}`
    return window.localStorage.getItem(tokenName)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.EMAIL_SUBMITTED)
  },
  hasEmailToken() {
    return !!TokenService.getEmailToken()
  },
  makeBasicEncryptedToken(email) {
    return window.btoa(`${email}`)
  },
}

export default TokenService
