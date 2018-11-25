const { isIntentName } = require('../utils/requests')
const { splitInPages, DEFAULT_PAGE_LENGTH } = require('../utils/speech')

const blog = require('../api/blog')

const canHandle = handlerInput => {
  return isIntentName(handlerInput, 'AMAZON.YesIntent') || isIntentName(handlerInput, 'ReadLastPost')
}

const handle = async handlerInput => {
  let speechText
  let endSession = false
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  const attributes = handlerInput.attributesManager.getSessionAttributes()
  try {
    const continueText = await requestAttributes.translate('continue')
    const continueSentence = `<s>${continueText}</s>`

    const post = await blog.getFirstPost()
    const text = await blog.getPost(post.url)

    const pages = splitInPages(
      text,
      DEFAULT_PAGE_LENGTH - continueSentence.length
    )

    const page = isIntentName(handlerInput, 'ReadLastPost') ? 0 : (attributes.page || 0)
    endSession = page === pages.length - 1

    speechText = `<speak>
      ${pages[page]}
      ${continueSentence}
    </speak>`

    attributes.page = (attributes.page || 0) + 1
    handlerInput.attributesManager.setSessionAttributes(attributes)
  } catch (e) {
    speechText = await requestAttributes.translate('error')
  }

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(endSession)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
