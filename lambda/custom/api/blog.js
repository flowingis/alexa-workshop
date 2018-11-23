const request = require('request')
const cheerio = require('cheerio')

const URL = 'https://www.ideato.it/blog/'

const getTitles = () => new Promise((resolve, reject) => {
  request(URL, (error, response, html) => {
    if (error) {
      reject(error)
      return
    }

    const $ = cheerio.load(html)

    const titles = $('.post-title a').map((i, elem) => {
      return cheerio.load(elem).text()
    }).get()

    resolve(titles)
  })
})

module.exports = {
  getTitles
}