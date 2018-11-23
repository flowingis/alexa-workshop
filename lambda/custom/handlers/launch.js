const { isType } = require('../utils/requests')
const blog = require('../api/blog')

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest') || isType(handlerInput, 'SessionEndedRequest')
const handle = async handlerInput => {
  let speechText
  try {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const posts = await blog.getTitles()

    speechText = await requestAttributes.translate('launch', {
      posts: posts.map(p => `<p>${p}</p>`)
    })
  } catch (e) {
    speechText = await requestAttributes.translate('error')
  }


  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}