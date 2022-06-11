const { SUCCESS, INVALID_BODY, SERVER_ERROR } = require("../utils/constants")
const router = require("express").Router();
const jwt = require("jsonwebtoken")
require('dotenv').config()


router.post("/getJWTToken",
    async (req, res) => {

        var email = req.body.email || ""
        var idToken = req.body.idToken || ""

        if (email == undefined || email == null || email == "" || !/\S+@\S+\.\S+/ig.test(email)) {
            return res.status(INVALID_BODY).json({ status: 0, message: "Invalid/Absent email Value" })
        }

        if (idToken == undefined || idToken == null || idToken == "") {
            return res.status(INVALID_BODY).json({ status: 0, message: "Invalid/Absent idToken Value" })
        }


        var firebaseAdminObj = req.app.locals.firebaseAdmin

        var auth = firebaseAdminObj.auth()

        console.log(req.body);

        try {
            var r = await auth.verifyIdToken(idToken)

            const payload = {
                email: r.email,
                uid: r.uid,
            }

            jwt.sign(payload, process.env.JWT_KEY,{expiresIn:'30d'}, (err, token) => {
                if (err) {
                    console.log(err);
                    return res.status(SERVER_ERROR).json({ status: 0, message: err, payload: null })
                }
                return res.status(SUCCESS).json({ status: 1, message: "Token Generated Successfully", payload: [{ token: token }] })
            })

        }
        catch (e) {
            console.log(e.message);
            return res.status(SUCCESS).json({ status: 0, message: "Invalid/Expired Token", payload: null })
        }

    }
)

/**
 
{
  name: 'Clash Royal',
  picture: 'https://lh3.googleusercontent.com/a/AATXAJyYS61M2JVYrU684bKrsVs3_LUQD3uK9Z90H2ou=s96-c',
  iss: 'https://securetoken.google.com/email-generator-5305c',
  aud: 'email-generator-5305c',
  auth_time: 1654941612,
  user_id: 'LzeMOXUCr9eeScTCF6Rume8zsz33',
  sub: 'LzeMOXUCr9eeScTCF6Rume8zsz33',
  iat: 1654948730,
  exp: 1654952330,
  email: 'orozoro12345@gmail.com',
  email_verified: true,
  firebase: {
    identities: { 'google.com': [Array], email: [Array] },
    sign_in_provider: 'google.com'
  },
  uid: 'LzeMOXUCr9eeScTCF6Rume8zsz33'
}

*/

module.exports = router