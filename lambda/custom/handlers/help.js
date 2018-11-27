const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.HelpIntent')

const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const help = await requestAttributes.translate('help')
  const speechText = `<speak>
    ${help}
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard('Help', 'Hakuna Matata')
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
