const { getLocale } = require('../utils/requests')

module.exports = (translate) => {
  const canHandle = () => true
  const handle = async handlerInput => {
    const locale = getLocale(handlerInput)
    const speechText = await translate(locale, 'error')

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse()
  }

  return {
    canHandle,
    handle
  }
}

