const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => {
  return isIntentName(handlerInput, 'AMAZON.StopIntent') ||
    isIntentName(handlerInput, 'AMAZON.CancelIntent') ||
    isIntentName(handlerInput, 'AMAZON.PauseIntent')
}

const handle = async handlerInput => {
  return handlerInput.responseBuilder
    .addAudioPlayerStopDirective()
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
