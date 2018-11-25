const Alexa = require('ask-sdk-core')
const loglessClient = require('logless-client')
const { BESPOKEN_SECRET } = require('./secrets.json')

const launchRequestHandler = require('./handlers/launch')
const readLastPostRequestHandler = require('./handlers/readLastPost')
const noRequestHandler = require('./handlers/no')
const errorHandler = require('./handlers/error')
const helpIntentHandler = require('./handlers/help')
const podcastIntentHandler = require('./handlers/podcast')

const translationsInterceptor = require('./interceptors/translations')

const skillBuilder = Alexa.SkillBuilders.custom()

const lambda = skillBuilder
  .addRequestInterceptors(translationsInterceptor)
  .addRequestHandlers(
    launchRequestHandler,
    helpIntentHandler,
    readLastPostRequestHandler,
    noRequestHandler,
    podcastIntentHandler
  )
  .addErrorHandlers(
    errorHandler
  )
  .lambda()

exports.handler = loglessClient.Logless.capture(BESPOKEN_SECRET, lambda)
