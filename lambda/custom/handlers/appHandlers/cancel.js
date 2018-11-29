const VALID_INTENTS = [
  'AMAZON.NoIntent',
  'AMAZON.CancelIntent'
]

const canHandle = (type, intent, financialConversation) => {
  if (!VALID_INTENTS.includes(intent)) {
    return false
  }

  return financialConversation.canDo('cancel')
}

const handle = async (translate, financialConversation, responseBuilder) => {
  const message = await translate('exit')

  const speechText = `<speak>
    <p>${message}</p>
</speak>`

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
