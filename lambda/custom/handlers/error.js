const canHandle = () => true
const handle = async (handlerInput, error) => {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const speechText = await requestAttributes.translate('error')

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
