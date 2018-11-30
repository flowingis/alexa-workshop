const canHandle = (type, intent, financialConversation) => {
  if (intent !== 'ReadBalance') {
    return false
  }

  return financialConversation.canDo('readBalance')
}

const handle = async (translate, financialConversation, responseBuilder) => {
  let speechText
  let finished = true
  try {
    const { totalMoney, alerts } = financialConversation.get()
    if (alerts.length === 0) {
      financialConversation.close()
    }
    finished = financialConversation.isFinished()

    const messageKey = alerts.length === 0 ? 'readBalanceWithNoAlerts' : 'readBalanceWithAlerts'
    const message = await translate(messageKey, { alerts: alerts.length, totalMoney })

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
