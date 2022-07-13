//This file is main email handling

const { SUCCESS,INVALID_BODY,SERVER_ERROR}=require("../utils/constants")

const router = require("express").Router();
const allPrompts = require("../prompts/masterPrompt")
const openai = require("../config/openai");
const GeneratedEmails = require("../models/GeneratedEmailModel");
const authFunctions = require("../middleware/authFunctions");
const UserModel = require("../models/UserModel");

router.post("/generateEmail",
authFunctions.authenticateUserToken,
    async (req, res) => {

        const emailSubject = req.body.subject
        const keywords = req.body.keywords
        const promptId = req.body.promptId
        const toEmail = req.body.toEmail

        //Verify body
        if (
            emailSubject == undefined || emailSubject == null || emailSubject == "" ||
            keywords == undefined || keywords == null || keywords == "" ||
            promptId == undefined || promptId == null || promptId == "" ||
            toEmail == undefined || toEmail == null || toEmail == ""
        ) {
            return res.status(INVALID_BODY).json({ status: 0, message: "Subject, To Email, Keywords and Prompt Id are required", payload: null })
        }

        //Get prompt to feed to model
        var prompt = (allPrompts.filter((e) => e.prompt.id == promptId))[0].prompt

        //Set subject & keywords to prompt
        prompt.setSubjectAndKeywords(emailSubject, keywords)

        console.log(prompt.promptText);

        //Generate email
        const completion = await openai.createCompletion("text-curie-001", {
            prompt: prompt.promptText,
            temperature: 0.23,
            max_tokens: prompt.maxTokens,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(completion.data.choices[0].text);

        var generatedEmailText = completion.data.choices[0].text;

        //save generated email to database and send response
        var generatedEmail = new GeneratedEmails({
            userId: req.user.uid,
            promptId: prompt.id,
            subject: emailSubject,
            keywords: keywords,
            generatedEmail: generatedEmailText,
            toEmailId: toEmail,
            tokens: prompt.maxTokens,
            createdOn: Math.floor(new Date().getTime() / 1000)
        })

        generatedEmail.save().then(async result => {

            // await UserModel.updateOne({email:req.user.email},{$inc:{usedTokens:250}})
            // await UserModel.updateOne({email:req.user.email},{$inc:{availableTokens:-250}})

            new Promise(async(resolve,reject)=>{
                await UserModel.updateOne({email:req.user.email},{$inc:{usedTokens:250}})
            await UserModel.updateOne({email:req.user.email},{$inc:{availableTokens:-250}})
            await UserModel.updateOne({email:req.user.email},{$inc:{generatedEmailCount:1}})
            })

            // await UserModel.updateOne({email:req.user.email},{$subtract:["$availableTokens",250]})

            return res.status(SUCCESS).json({
                status: 1,
                message: "Email Generated Successfully",
                payload: [{
                    id: result._id,
                    userId: req.user.uid,
                    promptId: prompt.id,
                    subject: emailSubject,
                    keywords: keywords,
                    generatedEmail: generatedEmailText,
                    toEmailId: toEmail,
                    tokens: prompt.maxTokens,
                    createdOn: Math.floor(new Date().getTime() / 1000)
                }]
            })
        }).catch(err => {
            console.log(err);
            res.status(SERVER_ERROR).json({ status: 0, message: err, payload: null })
        })

    }
)

//Get past generated emails from database, might get filter in future
router.post("/getGeneratedEmails",
authFunctions.authenticateUserToken,
    async (req, res) => {
        var emails = await GeneratedEmails.find({ userId: req.user.uid });

        // console.log(emails);

        if (emails.length == 0) {
            return res.status(SUCCESS).json({ status: 0, message: "No Emails Found for this user", payload: null })
        }

        // for (var i = 0; i < emails.length; i++) {
        //     emails[i] = {
        //         id: emails[i]._id,
        //         userId: emails[i].userId,
        //         promptId: emails[i].promptId,
        //         subject: emails[i].subject,
        //         keywords: emails[i].keywords,
        //         generatedEmail: emails[i].generatedEmail,
        //         toEmailId: emails[i].toEmailId,
        //         tokens: emails[i].tokens,
        //         createdOn: emails[i].createdOn
        //     }
        // }

        return res.status(SUCCESS).json({
            status: 1,
            message: "Data Fetched Successfully",
            payload: emails.reverse()
        })

    }
)

//Delete a generayed email from future
router.post("/deleteGeneratedEmail",
authFunctions.authenticateUserToken,
async(req,res)=>{

    var id = req.body.id || ""

    if(id==undefined||id==null||id==""){
        return res.status(INVALID_BODY).json({status:0,message: "Invalid id Value",payload:[]})
    }

    GeneratedEmails.deleteOne({_id:id}).then((r)=>{
        console.table(r);

        if(r.acknowledged&&r.deletedCount!=0){
            return res.status(SUCCESS).json({status:1,message:"Email Deleted Successfully",payload:[r]})
        }

        return res.status(INVALID_BODY).json({status:0,message:"Invalid id Value",payload:[r]})

    }).catch((e)=>{
        return res.status(SERVER_ERROR).json({status:0,message:"Something went Wrong",payload:[e]})
    })

}
)

module.exports = router