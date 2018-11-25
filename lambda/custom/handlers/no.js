const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.NoIntent')

const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const exit = await requestAttributes.translate('exit')
  const speechText = `<speak>
    ${exit}
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
