const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.HelpIntent')

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
