const canHandle = () => true
const handle = async (handlerInput, error) => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const errorMessage = await requestAttributes.translate('error')
  const speechText = `<speak>
    ${errorMessage}
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
