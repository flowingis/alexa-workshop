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
    assert.strictEqual(alerts, financialConversation.get().alerts)
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

  it('confirm should not decrease the number of remaining alerts', () => {
    const { alerts } = financialConversation.get()
    financialConversation.readAlert()
    financialConversation.confirm()
    assert.strictEqual(alerts, financialConversation.get().alerts + 1)
  })
})
