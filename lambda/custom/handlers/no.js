const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.NoIntent')

const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const speechText = await requestAttributes.translate('exit')

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
