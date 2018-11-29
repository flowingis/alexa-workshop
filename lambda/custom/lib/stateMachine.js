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
