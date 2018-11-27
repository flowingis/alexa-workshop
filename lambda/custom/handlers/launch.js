const { isType } = require('../utils/requests')
const financialConversationFactory = require('../lib/financialConversation')

const getAlertsMessage = async (t, alerts) => {
  if (alerts === 0) {
    return t('noAlerts')
  }

  return t('alerts', { alerts })
}

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest')
const handle = async handlerInput => {
  const financialConversation = financialConversationFactory()
  const { alerts } = financialConversation.get()
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const alertMessage = await getAlertsMessage(requestAttributes.translate, alerts)
  const launch = await requestAttributes.translate('launch')

  const speechText = `<speak>
    <p>${launch}</p>
    <p>${alertMessage}</p>
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(alerts === 0)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
