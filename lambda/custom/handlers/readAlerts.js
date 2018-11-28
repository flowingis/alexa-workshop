const { isIntentName } = require('../utils/requests')
const financialConversationFactory = require('../lib/financialConversation')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.YesIntent')

const handle = async handlerInput => {
  const financialConversation = financialConversationFactory()
  const { message, suggestedAction } = financialConversation.readAlert()

  const speechText = `<speak>
      <p>${message}</p>
      <p>${suggestedAction}</p>
    </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
