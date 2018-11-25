const { isIntentName } = require('../utils/requests')

const URL = 'https://file-5k5zcq03y.now.sh/'

const canHandle = handlerInput => isIntentName(handlerInput, 'ListenPodcast')

const handle = async handlerInput => {
  return handlerInput.responseBuilder
    .addAudioPlayerPlayDirective('REPLACE_ALL', URL, URL)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
