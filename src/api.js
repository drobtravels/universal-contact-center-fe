let apiUrl = 'https://eln5sp9xaj.execute-api.us-east-1.amazonaws.com/prod/';

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
    return fetch(apiUrl + 'twilioTokens', {
      headers: {
        'User-Token': idToken,
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then( (response) => response.json())
      .then( (result) => {
        console.log(result);
        return result.tokens

      });
  }
}
