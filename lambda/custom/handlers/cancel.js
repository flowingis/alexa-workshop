const { isIntentName } = require('../utils/requests')
const financialConversationFactory = require('../lib/financialConversation')

const canHandle = handlerInput => {
  if (!isIntentName(handlerInput, 'AMAZON.NoIntent') && !isIntentName(handlerInput, 'AMAZON.CancelIntent')) {
    return false
  }

  const attributes = handlerInput.attributesManager.getSessionAttributes()
  const financialConversation = financialConversationFactory(attributes.state)

  return financialConversation.canDo('cancel')
}

const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const message = await requestAttributes.translate('exit')

  const speechText = `<speak>
    <p>${message}</p>
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
