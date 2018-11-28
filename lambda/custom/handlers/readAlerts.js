const { isIntentName } = require('../utils/requests')
const financialConversationFactory = require('../lib/financialConversation')

const canHandle = handlerInput => {
  if (!isIntentName(handlerInput, 'AMAZON.YesIntent')) {
    return false
  }

  const attributes = handlerInput.attributesManager.getSessionAttributes()
  const financialConversation = financialConversationFactory(attributes.state)

  return financialConversation.canDo('readAlert')
}

const handle = async handlerInput => {
  let speechText
  try {
    const attributes = handlerInput.attributesManager.getSessionAttributes()
    const financialConversation = financialConversationFactory(attributes.state)
    const { message, suggestedAction } = financialConversation.readAlert()

    speechText = `<speak>
      <p>${message}</p>
      <p>${suggestedAction}</p>
    </speak>`

    attributes.state = financialConversation.get()
    handlerInput.attributesManager.setSessionAttributes(attributes)
  } catch (e) {
    speechText = e.message
  }

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
