const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    usedTokens:{
        type: Number,
        default: 0
    },
    availableTokens:{
        type: Number,
        default: 0
    },
    name:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    uid:{
        type: String,
        required: true
    },
    authTime:{
        type: Number,
        required: true
    },
    exp:{
        type: Number,
        required: true
    },
    generatedEmailCount:{
        type: Number,
        default: 0
    },
    deviceUid:{
        type:String,
        required:false,
        default: null
    },
    createdOn:{
        type: Date
    },
    updatedOn:{
        type: Date,
        default: null
    }
})

module.exports = UserModel = mongoose.model("UserModel",UserModelSchema)