const Alexa = require('ask-sdk-core')
const loglessClient = require('logless-client')
const { BESPOKEN_SECRET } = require('./secrets.json')

const launchRequestHandler = require('./handlers/launch')
const errorHandler = require('./handlers/error')
const helpIntentHandler = require('./handlers/help')
const readAlertsIntentHandler = require('./handlers/readAlerts')
const confirmIntentHandler = require('./handlers/confirm')
const cancelIntentHandler = require('./handlers/cancel')

const translationsInterceptor = require('./interceptors/translations')

const skillBuilder = Alexa.SkillBuilders.custom()

const lambda = skillBuilder
  .addRequestInterceptors(translationsInterceptor)
  .addRequestHandlers(
    launchRequestHandler,
    helpIntentHandler,
    readAlertsIntentHandler,
    confirmIntentHandler,
    cancelIntentHandler
  )
  .addErrorHandlers(
    errorHandler
  )
  .lambda()

exports.handler = loglessClient.Logless.capture(BESPOKEN_SECRET, lambda)
