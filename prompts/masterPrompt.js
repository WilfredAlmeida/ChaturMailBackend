//All prompts are provided by this file. It exports a list of objects of prompts

const requestPrompt = require("./requestPrompt")
const announcementPrompt = require("./announcementPrompt")
const jobApplicationPrompt = require("./jobApplicationPrompt")

const allPrompts = [
    { prompt: new jobApplicationPrompt() },
    { prompt: new requestPrompt() },
    { prompt: new announcementPrompt() },
]

module.exports = allPrompts