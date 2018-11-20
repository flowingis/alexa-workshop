const { getLocale } = require('../utils/requests')
const translate = require('../lib/translate')

const process = async handlerInput => {
    const locale = getLocale(handlerInput)
    const attributes = handlerInput.attributesManager.getRequestAttributes()
    attributes.translate = async (key, options) => translate(locale, key, options)
}

module.exports = {
    process
}