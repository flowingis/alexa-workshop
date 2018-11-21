const alexaTest = require('alexa-skill-test-framework')
const lambda = require('./index')

alexaTest.initialize(
    lambda,
    "amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
    "amzn1.ask.account.VOID")

describe("Workshop Skill", ()  => {
    describe("Participant List", () => {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                says: '<p>Welcome to the Alexa <lang xml:lang="it-IT">Ideato</lang> Workshop</p><p>I hope that you will enjoy this day with me</p><p>What do you want to do?</p>',
                reprompts: 'What do you want to do?',
                shouldEndSession: false
            },
            {
                request: alexaTest.getIntentRequest('ParticipantsList'),
                says: '<p>This is the list of the attendees of the workshop</p><p>Giorgio Mandolini</p><p>Francesco Tassi</p>',
                shouldEndSession: true
            }
        ]);
    })
})