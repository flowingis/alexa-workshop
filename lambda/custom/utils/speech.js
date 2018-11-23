const SPEAK_TAGS = '<speak></speak>'

const sentenceTransformer = sentence => `<s>${sentence}</s>`

const splitInPages = (text, pageSize = 3000, transformer = sentenceTransformer) => {
  const realPageSize = pageSize - SPEAK_TAGS.length
  const pages = []

  let currentPage = ''

  const sentences = text
    .split(/[.!?]+/)
    .map(transformer)

  const realText = sentences.join()

  if (realText.length <= realPageSize) {
    return [
      realText
    ]
  }

  sentences.forEach(sentence => {
    const newPageLength = currentPage.length + sentence.length
    if (newPageLength > realPageSize) {
      pages.push(currentPage)
      currentPage = sentence
    } else {
      currentPage += sentence
    }
  })

  return pages
}

module.exports = {
  splitInPages
}
