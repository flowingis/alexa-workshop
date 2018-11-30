const getMessage = async (translate, alerts) => {
  if (alerts && alerts.length) {
    return translate('launchWithAlerts', { alerts: alerts.length })
  }

  return translate('launchWithNoAlerts')
}

const canHandle = (type, intent, financialConversation, handlerInput) => {
  return type === 'LaunchRequest'
}

const handle = async (translate, financialConversation, responseBuilder) => {
  const { alerts } = financialConversation.get()
  const message = await getMessage(translate, alerts)

  const speechText = `<speak>
    <p>${message}</p>
  </speak>`

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(financialConversation.isFinished())
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
