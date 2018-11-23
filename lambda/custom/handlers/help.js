const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.HelpIntent')

  const handle = async handlerInput => {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechText = await requestAttributes.translate('help')

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse()
  }


module.exports = {
  canHandle,
  handle
}
