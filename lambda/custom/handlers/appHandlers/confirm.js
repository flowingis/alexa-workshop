const canHandle = (type, intent, financialConversation) => {
  if (intent !== 'AMAZON.YesIntent') {
    return false
  }

  return financialConversation.canDo('confirm')
}

const handle = async (translate, financialConversation, responseBuilder) => {
  let speechText
  let finished = true
  try {
    const alerts = financialConversation.confirm()
    finished = financialConversation.isFinished()

    const messageKey = alerts === 0 ? 'operationConfirmedWithNoAlerts' : 'operationConfirmedWithAlerts'
    const message = await translate(messageKey, { alerts })

    speechText = `<speak>
      <p>${message}</p>
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
