const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");


const  FeedbackSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    userId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdOn:{
        type: Number,
        default: Date.now()
    }
})

module.exports = FeedbackModel = mongoose.model("FeedbackModel", FeedbackSchema)