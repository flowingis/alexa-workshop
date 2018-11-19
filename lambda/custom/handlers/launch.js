const { isType, getLocale } = require('../utils/requests')

module.exports = (translate) => {
  const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest')
  const handle = async handlerInput => {
    const locale = getLocale(handlerInput)
    const speechText = await translate(locale, 'launch')
    const repromptText = await translate(locale, 'reprompt')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withShouldEndSession(false)
      .getResponse()
  }

  return {
    canHandle,
    handle
  }
}
