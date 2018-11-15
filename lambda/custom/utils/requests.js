const get = require('lodash.get')

const isType = (handlerInput, type) => get(handlerInput, 'requestEnvelope.request.type') === type
const isIntentName = (handlerInput, name) => {
  return isType(handlerInput, 'IntentRequest') && get(handlerInput, 'requestEnvelope.request.intent.name') === name
}

module.exports = {
  isIntentName,
  isType
}
