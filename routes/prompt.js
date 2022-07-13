const { SUCCESS,INVALID_BODY,SERVER_ERROR}=require("../utils/constants")
const authFunctions = require("../middleware/authFunctions");

const router = require("express").Router();
const allPrompts = require("../prompts/masterPrompt")


//Fetch and return all prompts from database
router.post("/getAllPrompts",
authFunctions.authenticateUserToken,
    async (req, res) => {
        var payload = []
        var updatedAfter = req.body.updatedAfter

        if(updatedAfter!=undefined&&updatedAfter!=null&&typeof updatedAfter!="number"){
            return res.status(INVALID_BODY).json({status:0,message:"Invalid updatedAfter value",payload:null})
        }

        for (var i = 0; i < allPrompts.length; i++) {
            payload.push({
                id: allPrompts[i].prompt.id,
                title: allPrompts[i].prompt.title,
                slug: allPrompts[i].prompt.slug,
                maxTokens:allPrompts[i].prompt.maxTokens,
                shortDescription:allPrompts[i].prompt.shortDescription,
                iconUrl:allPrompts[i].prompt.iconUrl,
                description:allPrompts[i].prompt.description,
                updatedOn:allPrompts[i].prompt.updatedOn
            })
        }

        res.status(SUCCESS).json({
            status: 1,
            message: "Data Fetched Successfully",
            payload: payload
        })

    }
)

module.exports = router