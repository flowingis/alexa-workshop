const { isType, isIntentName } = require('../utils/requests')
const blog = require('../api/blog')

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest') || isIntentName(handlerInput, 'AMAZON.ResumeIntent')
const handle = async handlerInput => {
  let message
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  try {
    const post = await blog.getFirstPost()

    message = await requestAttributes.translate('launch', {
      title: `<p>${post.title}</p>`
    })
  } catch (e) {
    message = await requestAttributes.translate('error')
  }

  const speechText = `<speak>
      ${message}
  </speak>`

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
