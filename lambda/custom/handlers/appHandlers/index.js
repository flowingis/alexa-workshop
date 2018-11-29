const launchRequestHandler = require('./launch')
const helpIntentHandler = require('./help')
const readAlertsIntentHandler = require('./readAlerts')
const confirmIntentHandler = require('./confirm')
const cancelIntentHandler = require('./cancel')

module.exports = [
  launchRequestHandler,
  helpIntentHandler,
  readAlertsIntentHandler,
  cancelIntentHandler,
  confirmIntentHandler
]
