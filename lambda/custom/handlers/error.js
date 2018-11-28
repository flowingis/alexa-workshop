const { getLocale } = require('../utils/requests')
const translate = require('../lib/translate')

const canHandle = () => true
const handle = async (handlerInput, error) => {
  const locale = getLocale(handlerInput)
  const errorMessage = await translate(locale, 'error')
  const speechText = `<speak>
    ${errorMessage}
  </speak>`

  handlerInput.attributesManager.setSessionAttributes({
    error: error.message
  })

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
