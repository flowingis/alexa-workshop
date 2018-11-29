const { getLocale } = require('../utils/requests')
const translate = require('../lib/translate')
const financialConversationFactory = require('../lib/financialConversation')
const errorHandler = require('./error')
const applicationHandlers = require('./appHandlers')
const get = require('lodash.get')

const extractDataFromHandlerInput = handlerInput => {
  return {
    type: get(handlerInput, 'requestEnvelope.request.type'),
    intent: get(handlerInput, 'requestEnvelope.request.intent.name')
  }
}

const canHandle = () => true
const handle = async handlerInput => {
  try {
    const localizedTranslate = async (key, options) => {
      const locale = getLocale(handlerInput)
      return translate(locale, key, options)
    }

    const { type, intent } = extractDataFromHandlerInput(handlerInput)

    const attributes = handlerInput.attributesManager.getSessionAttributes()
    const financialConversation = financialConversationFactory(attributes.state)

    const handler = applicationHandlers.find(handlerToCheck => {
      return handlerToCheck.canHandle(type, intent, financialConversation, handlerInput)
    })

    if (!handler) {
      return errorHandler.handle(handlerInput, new Error('No Custom Handler found'))
    }

    const session = handlerInput.attributesManager.getSessionAttributes()

    const response = handler.handle(
      localizedTranslate,
      financialConversation,
      handlerInput.responseBuilder,
      session,
      handlerInput)

    session.state = financialConversation.get()
    handlerInput.attributesManager.setSessionAttributes(session)

    return response
  } catch (e) {
    return errorHandler.handle(handlerInput, e)
  }
}

module.exports = {
  canHandle,
  handle
}
