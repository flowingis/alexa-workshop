const StateMachine = require('javascript-state-machine')

const transitions = [
  {
    name: 'readAlert',
    from: ['launched', 'alertConfirmed'],
    to: 'alertRead'
  },
  {
    name: 'cancel',
    from: ['launched', 'alertRead', 'alertConfirmed'],
    to: 'exit'
  },
  {
    name: 'noAlerts',
    from: 'alertConfirmed',
    to: 'exit'
  },
  {
    name: 'confirm',
    from: 'alertRead',
    to: 'alertConfirmed'
  },
  {
    name: 'readBalance',
    from: 'launched',
    to: 'launched'
  },
  {
    name: 'close',
    from: 'launched',
    to: 'exit'
  },
  {
    name: 'moneyTransfer',
    from: 'launched',
    to: 'launched'
  }
]

module.exports = (initValue = 'launched', onStatusChange = () => {}) => new StateMachine({
  init: initValue,
  transitions,
  methods: {
    onTransition: (lifecycle) => {
      onStatusChange(lifecycle.to)
    }
  }
})
