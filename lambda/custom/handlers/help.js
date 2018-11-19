const { isIntentName, getLocale } = require('../utils/requests')

module.exports = (translate) => {
  const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.HelpIntent')

  const handle = async handlerInput => {
    const locale = getLocale(handlerInput)
    const speechText = await translate(locale, 'help')

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Help', 'Hakuna Matata')
      .withShouldEndSession(true)
      .getResponse()
  }
  return {
    canHandle,
    handle
  }
}
