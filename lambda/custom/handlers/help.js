const canHandle = handlerInput => handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'

const handle = handlerInput => {
  const speechText = 'For now you can do nothing, Hakuna Matata!'

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
