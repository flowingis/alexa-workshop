const { isType } = require('../utils/requests')

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest')
const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
  const speechText = await requestAttributes.translate('launch')
  const repromptText = await requestAttributes.translate('reprompt')

  return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(repromptText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}