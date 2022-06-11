const requestPrompt = require("./requestPrompt")
const announcementPrompt = require("./announcementPrompt")

const allPrompts = [
    { prompt: new requestPrompt() },
    { prompt: new announcementPrompt() },
]

module.exports = allPrompts