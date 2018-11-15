const Alexa = require('ask-sdk-core')
const LaunchRequestHandler = require('./handlers/launch')
const ErrorHandler = require('./handlers/error')
const HelpIntentHandler = require('./handlers/help')

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
