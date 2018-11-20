const participants = require('../api/participants')
const { isIntentName } = require('../utils/requests')

const canHandle = handlerInput => isIntentName(handlerInput, 'ParticipantsList')

  const handle = async handlerInput => {  
    const list = await participants.list()
    const names = list.map(p => `<p>${p.name}</p>`).join('')
    
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechText = await requestAttributes.translate('participants.list', {names})

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse()
  }


module.exports = {
  canHandle,
  handle
}
