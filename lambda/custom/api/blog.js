const request = require('request')
const cheerio = require('cheerio')

const URL = 'https://www.ideato.it/blog/'

const getPost = (url) => new Promise((resolve, reject) => {
  request(url, (error, response, html) => {
    if (error) {
      reject(error)
      return
    }

    const $ = cheerio.load(html)

    const text =
        $('article')
          .first()
          .text()
          .replace(/\r?\n|\r/g, '')
          .replace(/\t/g, '')

    resolve(text)
  })
})

const getPosts = () => new Promise((resolve, reject) => {
  request(URL, (error, response, html) => {
    if (error) {
      reject(error)
      return
    }

    const $ = cheerio.load(html)

    const titles = $('.post-title a').map((i, elem) => {
      const element = $(elem)
      return {
        title: element.text(),
        url: element.attr('href')
      }
    }).get()

    resolve(titles)
  })
})

module.exports = {
  getTitles: async () => {
    const posts = await getPosts()
    return posts.map(p => p.text)
  },
  getFirstPost: async () => {
    const posts = await getPosts()
    return posts[0]
  },
  getPost
}
