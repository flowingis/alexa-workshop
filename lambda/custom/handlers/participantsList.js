const participants = require('../api/participants')
const { isIntentName, getLocale } = require('../utils/requests')

module.exports = (translate) => {
  const canHandle = handlerInput => isIntentName(handlerInput, 'ParticipantsList')

  const handle = async handlerInput => {
    const locale = getLocale(handlerInput)
    const list = await participants.list()
    const names = list.map(p => `<p>${p.name}</p>`).join('')

    const speechText = await translate(locale, 'participants.list', {names})

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse()
  }
  return {
    canHandle,
    handle
  }
}
