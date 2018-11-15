const get = require('lodash.get')

const isType = (handlerInput, type) => get(handlerInput, 'requestEnvelope.request.type') === type
const isIntentName = (handlerInput, name) => {
  return isType(handlerInput, 'IntentRequest') && get(handlerInput, 'requestEnvelope.request.intent.name') === name
}

const getLocale = (handlerInput, defaultLocale = 'en-US') => get(handlerInput, 'requestEnvelope.request.locale', defaultLocale)

module.exports = {
  isIntentName,
  isType,
  getLocale
}
