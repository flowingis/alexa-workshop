const data = require('./participants.json')
const list = () => Promise.resolve(data)

module.exports = {
    list
}