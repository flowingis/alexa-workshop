const Alexa = require('ask-sdk-core')
const loglessClient = require('logless-client')
const { BESPOKEN_SECRET } = require('./secrets.json')

const defaultHandler = require('./handlers/default')
const errorHandler = require('./handlers/error')

const skillBuilder = Alexa.SkillBuilders.custom()

const lambda = skillBuilder
  .addRequestHandlers(
    defaultHandler
  )
  .addErrorHandlers(
    errorHandler
  )
  .lambda()

exports.handler = loglessClient.Logless.capture(BESPOKEN_SECRET, lambda)
