const getAlertsMessage = async (t, alerts) => {
  if (alerts === 0) {
    return t('noAlerts')
  }

  return t('alerts', { alerts })
}

const canHandle = (type, intent, financialConversation, handlerInput) => {
  return type === 'LaunchRequest'
}

const handle = async (translate, financialConversation, responseBuilder) => {
  const { alerts } = financialConversation.get()
  const alertMessage = await getAlertsMessage(translate, alerts.length)
  const launch = await translate('launch')

  const speechText = `<speak>
    <p>${launch}</p>
    <p>${alertMessage}</p>
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
