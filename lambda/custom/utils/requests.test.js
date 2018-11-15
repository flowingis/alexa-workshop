const assert = require('assert')
const { isType, isIntentName } = require('./requests')

describe('isType', () => {
    it('should return false with an invalid object', () => {
        assert.equal(isType(undefined, 'type'), false)
        assert.equal(isType(null, 'type'), false)
        assert.equal(isType({}, 'type'), false)
    })

    it('should extract request type', () => {

        const HANDLER_INPUT = {
            requestEnvelope: {
                request: {
                    type:'THIS_IS_A_TYPE'
                }
            }
        }
        assert.equal(isType(HANDLER_INPUT, 'THIS_IS_A_TYPE'), true)
        
        assert.equal(isType(HANDLER_INPUT, 'NOT_THE_RIGHT_TYPE'),false)
    })
})

describe('isIntentName', () => {
    it('should return false with an invalid object', () => {
        assert.equal(isIntentName(undefined, 'type'),false)
        assert.equal(isIntentName(null, 'type'),false)
        assert.equal(isIntentName({}, 'type'),false)
    })

    it('should extract intent name', () => {

        const HANDLER_INPUT = {
            requestEnvelope: {
                request: {
                    type:'IntentRequest',
                    intent: {
                        name:'INTENT_NAME'
                    }
                }
            }
        }

        assert.equal(isIntentName(HANDLER_INPUT, 'INTENT_NAME'),true)
        assert.equal(isIntentName(HANDLER_INPUT, 'NOT_INTENT_NAME'),false)
    })

    it('should return false when not managing an intent request', () => {
        const HANDLER_INPUT = {
            requestEnvelope: {
                request: {
                    type:'LaunchRequest',
                    intent: {
                        name:'INTENT_NAME'
                    }
                }
            }
        }

        assert.equal(isIntentName(HANDLER_INPUT, 'INTENT_NAME'),false)
    })

})
