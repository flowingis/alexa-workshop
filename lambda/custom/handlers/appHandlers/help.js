const canHandle = (type, intent, financialConversation, handlerInput) => {
  return intent === 'AMAZON.HelpIntent'
}

const handle = async (translate, financialConversation, responseBuilder) => {
  const help = await translate('help')
  const speechText = `<speak>
    ${help}
  </speak>`

  return responseBuilder
    .speak(speechText)
    .withSimpleCard('Help', 'Hakuna Matata')
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
