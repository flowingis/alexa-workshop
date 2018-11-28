const INITIAL_STATE = {
  alerts: 2
}

module.exports = (initialState = INITIAL_STATE) => {
  let state = { ...initialState }

  const readAlert = () => {
    state.alerts--
    return {
      message: 'Messaggio Alert',
      suggestedAction: 'Vendere le azioni?'
    }
  }

  const get = () => Object.freeze({ ...state })

  return {
    get,
    readAlert
  }
}
