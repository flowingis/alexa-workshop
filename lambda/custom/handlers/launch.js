const canHandle = handlerInput => handlerInput.requestEnvelope.request.type === 'LaunchRequest'
const handle = handlerInput => {
  const speechText = 'Welcome to the Alexa Ideato Workshop, I hope that you will enjoy this day with me'

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
