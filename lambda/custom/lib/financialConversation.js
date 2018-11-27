const INITIAL_STATE = {
  alerts: Math.floor(Math.random() * 4)
}

module.exports = (initialState = INITIAL_STATE) => {
  let state = { ...initialState }

  const get = () => Object.freeze({ ...state })

  return {
    get
  }
}
