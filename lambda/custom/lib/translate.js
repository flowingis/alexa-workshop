const i18next = require('i18next')
const en = require('../i18n/en.json')
const it = require('../i18n/it.json')

let initialized = false

const init = options => new Promise(resolve => {
    i18next.init(options, resolve)
})

const get = (language, key, options) => `<speak>
    ${i18next.getFixedT(language)(key,options)}
</speak>`

const translate = async (language, key, options) => {
    if(initialized){
        return get(language, key, options)
    }

    await init({
        lng:'en',
        resources: {
            en,
            it
        }
    })

    return get(language, key, options)
}

module.exports = translate