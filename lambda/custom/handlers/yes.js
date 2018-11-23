const { isIntentName } = require('../utils/requests')
const { splitInPages } = require('../utils/speech')

const blog = require('../api/blog')

const canHandle = handlerInput => isIntentName(handlerInput, 'AMAZON.YesIntent')

const handle = async handlerInput => {
  let speechText
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  try {
    const post = await blog.getFirstPost()
    const text = await blog.getPost(post.url)

    const pages = splitInPages(text)

    speechText = `<speak>
      ${pages[0]}
    </speak>`
  } catch (e) {
    speechText = await requestAttributes.translate('error')
  }

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
