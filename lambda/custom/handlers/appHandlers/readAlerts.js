const canHandle = (type, intent, financialConversation, handlerInput) => {
  if (intent !== 'AMAZON.YesIntent') {
    return false
  }

  return financialConversation.canDo('readAlert')
}

const handle = async (translate, financialConversation, responseBuilder) => {
  let speechText
  let finished = true
  try {
    const { message, suggestedAction } = financialConversation.readAlert()
    finished = financialConversation.isFinished()

    speechText = `<speak>
      <p>${message}</p>
      <p>${suggestedAction}</p>
    </speak>`
  } catch (e) {
    speechText = e.message
  }

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(finished)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
