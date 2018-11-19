const Alexa = require('ask-sdk-core')
const translate = require('./lib/translate')
const loglessClient = require('logless-client');
const { BESPOKEN_SECRET } = require('./secrets.json')

const launchRequestHandlerFactory = require('./handlers/launch')
const errorHandlerFactory = require('./handlers/error')
const helpIntentHandlerFactory = require('./handlers/help')
const participantsListHandlerFactory = require('./handlers/participantsList')

const skillBuilder = Alexa.SkillBuilders.custom()

const lambda = skillBuilder
.addRequestHandlers(
  launchRequestHandlerFactory(translate),
  helpIntentHandlerFactory(translate),
  participantsListHandlerFactory(translate)
)
.addErrorHandlers(
  errorHandlerFactory(translate)
)
.lambda()


exports.handler = loglessClient.Logless.capture(BESPOKEN_SECRET, lambda)
