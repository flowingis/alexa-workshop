const StateMachine = require('javascript-state-machine')

const transitions = [
  {
    name: 'readAlert',
    from: 'launched',
    to: 'alertRead'
  },
  {
    name: 'cancel',
    from: ['alertRead', 'alertConfirmed'],
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
    name: 'nextAlert',
    from: 'alertConfirmed',
    to: 'alertRead'
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
