const { SUCCESS,INVALID_BODY,SERVER_ERROR}=require("../utils/constants")

const router = require("express").Router()
const authFunctions = require("../middleware/authFunctions")
var fs = require('fs');
const path = require("path")


router.post("/getBannerImage",
authFunctions.authenticateUserToken,
async(req,res)=>{

    var base64str = base64_encode(path.join(__dirname,"../tmp/bannerImg.png"));

    return res.status(SUCCESS).json({status:1,message:"Data Fetched Successfully",payload:[{imageData:base64str}]})

    // return res.status(SUCCESS).json({status:1,message:"Data Fetched Successfully",payload:[{imageData:"NULL"}]})

}
)

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

module.exports = router