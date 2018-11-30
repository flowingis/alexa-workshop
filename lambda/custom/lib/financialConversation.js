const stateMachineFactory = require('./stateMachine')
const clone = require('lodash.clonedeep')

const INITIAL_STATE = {
  alerts: [
    {
      message: 'Primo Messaggio Alert',
      suggestedAction: 'Vendere le azioni?'
    },
    {
      message: 'Secondo Messaggio Alert',
      suggestedAction: 'Comprare le azioni?'
    }
  ],
  status: 'launched',
  totalMoney: 10000
}

module.exports = (initialState = INITIAL_STATE) => {
  let state = clone(initialState)
  let onStatusChange = to => {
    state.status = to
  }

  let stateMachine = stateMachineFactory(state.status, onStatusChange)

  if (!stateMachine) {
    throw new Error('NO STATE MACHINE!')
  }

  const readAlert = () => {
    stateMachine.readAlert()
    return state.alerts[state.alerts.length - 1]
  }

  const confirm = () => {
    stateMachine.confirm()
    state.alerts.pop()
    if (state.alerts.length === 0) {
      stateMachine.noAlerts()
    }

    return state.alerts.length
  }

  const cancel = () => {
    stateMachine.cancel()
  }

  const get = () => Object.freeze(clone(state))

  const canDo = state => {
    return stateMachine.can(state)
  }

  const isFinished = () => {
    return state.status === 'exit'
  }

  return {
    get,
    readAlert,
    confirm,
    cancel,
    canDo,
    isFinished
  }
}
