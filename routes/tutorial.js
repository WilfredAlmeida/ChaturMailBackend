const { SUCCESS, INVALID_BODY, SERVER_ERROR } = require("../utils/constants")
const authFunctions = require("../middleware/authFunctions");
const tutorials = require("../tutorials/masterTutorial");

const router = require("express").Router();

//Fetch and return all tutorials from database
router.post("/getAllTutorials",
authFunctions.authenticateUserToken,
async (req, res) => {
    res.status(SUCCESS).json({status:1,message:"Data Fetched Successfully",payload:tutorials})
})

module.exports=router