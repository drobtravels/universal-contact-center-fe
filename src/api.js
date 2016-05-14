let apiUrl = 'https://eln5sp9xaj.execute-api.us-east-1.amazonaws.com/prod/client/';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.error(response.statusText);
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export var API = {

  getTokens(idToken)  {
    return fetch(apiUrl + 'tokens', {
      headers: {
        'User-Token': idToken,
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then( (response) => response.json())
      .then( (result) => result.tokens);
  },

  postSMS(params, idToken) {
    fetch(apiUrl + 'messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Token': idToken
      },
      body: JSON.stringify(params)
    })
      .then(checkStatus)
  }
}
