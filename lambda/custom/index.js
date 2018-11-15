const Alexa = require('ask-sdk-core')
const translate = require('./lib/translate')

const launchRequestHandlerFactory = require('./handlers/launch')
const errorHandlerFactory = require('./handlers/error')
const helpIntentHandlerFactory = require('./handlers/help')

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    launchRequestHandlerFactory(translate),
    helpIntentHandlerFactory(translate)
  )
  .addErrorHandlers(
    errorHandlerFactory(translate)
  )
  .lambda()
