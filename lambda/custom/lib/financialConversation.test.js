const assert = require('assert')
const financialConversationFactory = require('./financialConversation')

let financialConversation

describe('financialConversation', () => {
  beforeEach(() => {
    financialConversation = financialConversationFactory()
  })

  it('should start on "launched" status', () => {
    const { status } = financialConversation.get()
    assert.strictEqual(status, 'launched')
  })

  it('readAlert should not decrease the number of remaining alerts', () => {
    const { alerts } = financialConversation.get()
    financialConversation.readAlert()
    assert.strictEqual(alerts.length, financialConversation.get().alerts.length)
  })

  it('readAlert should change the status to "alertRead"', () => {
    financialConversation.readAlert()
    const { status } = financialConversation.get()
    assert.strictEqual(status, 'alertRead')
  })

  it('confirm should be possible only after an alertRead', () => {
    assert.throws(() => {
      financialConversation.confirm()
    })

    assert.doesNotThrow(() => {
      financialConversation.readAlert()
      financialConversation.confirm()
    })
  })

  it('confirm should decrease the number of remaining alerts', () => {
    const { alerts } = financialConversation.get()
    financialConversation.readAlert()
    financialConversation.confirm()
    assert.strictEqual(alerts.length, financialConversation.get().alerts.length + 1)
  })

  it('readAlert should throw when no alert are remaining', () => {
    const financialConversation = financialConversationFactory({
      alerts: [
        {
          message: 'Dummy'
        }
      ]
    })

    financialConversation.readAlert()
    financialConversation.confirm()

    assert.throws(() => {
      financialConversation.readAlert()
    })
  })
})
