const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorialModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    title:{
        type: String,
        required:true
    },
    htmlContent:{
        type:String,
        required: true
    },
    updatedOn:{
        type: Date,
        required:true
    }
})
