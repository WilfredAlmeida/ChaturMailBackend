const { SUCCESS,INVALID_BODY,SERVER_ERROR}=require("../utils/constants")

const router = require("express").Router()
const authFunctions = require("../middleware/authFunctions")
var fs = require('fs');
const path = require("path");
const FeedbackModel = require("../models/FeedbackModel");


router.post("/getBannerImage",
authFunctions.authenticateUserToken,
async(req,res)=>{

    var base64str = base64_encode(path.join(__dirname,"../tmp/bannerImg.png"));

    return res.status(SUCCESS).json({status:1,message:"Data Fetched Successfully",payload:[{imageData:base64str}]})

    // return res.status(SUCCESS).json({status:1,message:"Data Fetched Successfully",payload:[{imageData:"NULL"}]})

}
)


router.post("/submitFeedback",
authFunctions.authenticateUserToken,
async(req,res)=>{

    var subject = req.body.subject
    var message = req.body.message

    if(subject==undefined||subject==null||subject.length<10||message==undefined||message==null||message.length<10){
        return res.status(INVALID_BODY).json({status:0,message:"Enter more than 10 characters"})
    }

    var feedback = new FeedbackModel({
        userId:req.user.uid,
        email:req.user.email,
        subject:subject,
        message:message
    })

    feedback.save().then((r)=>console.log(r)).catch(e=>console.log(e));

    return res.status(SUCCESS).json({status:1,message:"Data Saved Successfully",payload:null})

}
)


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

module.exports = router