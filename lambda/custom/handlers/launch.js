const { isType } = require('../utils/requests')

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest')
const handle = handlerInput => {
  const speechText = `<speak>
    <p>Welcome to the Alexa <lang xml:lang="it-IT">Ideato</lang> Workshop</p> 
    <p>I hope that you will enjoy this day with me</p>
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
