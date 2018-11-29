const noContactError = async (translate, responseBuilder, name) => {
  const noContactMessage = await translate('noContact', { name })

  const speechText = `<speak>
      ${noContactMessage}
    </speak>`

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

const noFundsError = async (translate, responseBuilder, totalMoney) => {
  const notEnoughFunds = await translate('notEnoughFunds', { totalMoney })

  const speechText = `<speak>
      ${notEnoughFunds}
    </speak>`

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

const canHandle = (type, intent, financialConversation, handlerInput) => {
  if (intent !== 'MoneyTransfer') {
    return false
  }

  return financialConversation.canDo('moneyTransfer')
}

const handle = async (translate, financialConversation, responseBuilder, session, slots) => {
  const errors = await financialConversation.validate({
    to: slots.Name.value,
    value: slots.Value.value
  })

  if (errors.includes('NOT_ENOUGH_FUNDS')) {
    const { totalMoney } = financialConversation.get()
    return noFundsError(translate, responseBuilder, totalMoney)
  }

  if (errors.includes('CONTACT_NOT_FOUND')) {
    return noContactError(translate, responseBuilder, slots.Name.value)
  }

  if (errors.includes('NO_VALUE')) {
    const message = await translate('askForValuetInMoneyTransfer')
    return responseBuilder
      .speak(message)
      .addElicitSlotDirective('Value')
      .getResponse()
  }

  if (errors.includes('NO_CONTACT')) {
    const message = await translate('askForRecipientInMoneyTransfer')
    return responseBuilder
      .speak(message)
      .addElicitSlotDirective('Name')
      .getResponse()
  }

  await financialConversation.moneyTransfer({
    to: slots.Name.value,
    value: slots.Value.value
  })

  const { totalMoney } = financialConversation.get()

  const message = await translate('moneyTransferDone', {
    name: slots.Name.value,
    value: slots.Vame.value,
    totalMoney
  })

  const speechText = `<speak>
    ${message}
  </speak>`

  return responseBuilder
    .speak(speechText)
    .withShouldEndSession(financialConversation.isFinished())
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
