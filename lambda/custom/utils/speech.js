const SPEAK_TAGS = '<speak></speak>'

const sentenceTransformer = sentence => `<s>${sentence}</s>`
const DEFAULT_PAGE_LENGTH = 500

const splitInPages = (text, pageSize = DEFAULT_PAGE_LENGTH, transformer = sentenceTransformer) => {
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
  splitInPages,
  DEFAULT_PAGE_LENGTH
}
