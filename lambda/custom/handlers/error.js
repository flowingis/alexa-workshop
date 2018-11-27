const canHandle = () => true
const handle = async handlerInput => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const error = await requestAttributes.translate('error')
  const speechText = `<speak>
    ${error}
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
