import config from '../config'

const EmailApiService = {
    getEmails(token){
        return fetch(`${config.API_ENDPOINT}/ratings`, {
          method: 'GET',
          headers: { 
              'content-type': 'application/json',
              'Authorization' : `token ${token}`
          },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    postEmail(newEmail) {
        return fetch(`${config.API_ENDPOINT}/emails`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            ...newEmail
          }),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    }
}

export default EmailApiService