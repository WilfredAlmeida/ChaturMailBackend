const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");


const  GeneratedEmailSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    userId: {
        type: String,
        required: true
    },
    promptId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    generatedEmail: {
        type: String,
        required: true
    },
    toEmailId:{
        type: String,
        required: true
    },
    tokens:{
        type: Number,
        required: true
    },
    createdOn:{
        type: Number,
        required: true
    }
})

module.exports = GeneratedEmails = mongoose.model("GeneratedEmails", GeneratedEmailSchema)