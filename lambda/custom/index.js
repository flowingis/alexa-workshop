const Alexa = require('ask-sdk-core')
const loglessClient = require('logless-client')
const { BESPOKEN_SECRET } = require('./secrets.json')

const launchRequestHandler = require('./handlers/launch')
const yesRequestHandler = require('./handlers/yes')
const noRequestHandler = require('./handlers/no')
const errorHandler = require('./handlers/error')
const helpIntentHandler = require('./handlers/help')

const translationsInterceptor = require('./interceptors/translations')

const skillBuilder = Alexa.SkillBuilders.custom()

const lambda = skillBuilder
  .addRequestInterceptors(translationsInterceptor)
  .addRequestHandlers(
    launchRequestHandler,
    helpIntentHandler,
    yesRequestHandler,
    noRequestHandler
  )
  .addErrorHandlers(
    errorHandler
  )
  .lambda()

exports.handler = loglessClient.Logless.capture(BESPOKEN_SECRET, lambda)
