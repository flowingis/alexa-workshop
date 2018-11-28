const stateMachineFactory = require('./stateMachine')

const INITIAL_STATE = {
  alerts: 2,
  status: 'launched'
}

module.exports = (initialState = INITIAL_STATE) => {
  let state = { ...initialState }
  let onStatusChange = to => {
    state.status = to
  }

  let stateMachine = stateMachineFactory(state.status, onStatusChange)

  if (!stateMachine) {
    throw new Error('NO STATE MACHINE!')
  }

  const readAlert = () => {
    stateMachine.readAlert()
    state.alerts--
    return {
      message: 'Messaggio Alert',
      suggestedAction: 'Vendere le azioni?'
    }
  }

  const confirm = () => {
    stateMachine.confirm()
    const { alerts } = state
    if (alerts === 0) {
      stateMachine.noAlerts()
    }

    return alerts
  }

  const cancel = () => {
    stateMachine.cancel()
  }

  const nextAlert = () => {
    stateMachine.nextAlert()
    state.alerts--
    return {
      message: 'Messaggio Alert',
      suggestedAction: 'Vendere le azioni?'
    }
  }

  const get = () => Object.freeze({ ...state })

  const canDo = state => {
    return stateMachine.can(state)
  }

  return {
    get,
    readAlert,
    confirm,
    cancel,
    canDo,
    nextAlert
  }
}
