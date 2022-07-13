//This file does Authentication

const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const jwt = require('jsonwebtoken')

//Code to get JWT from request
const opts = {};
const extractedJwtToken = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = extractedJwtToken;

//JWT Signing Key
const extractedSecretOrKey = process.env.JWT_KEY;
opts.secretOrKey = extractedSecretOrKey;

//Middleware function called by API's
async function authenticateUserToken(req, res, next) {
	var jwtPayload = await authJWT(req);

	if (jwtPayload.status == 0) {
		return res.status(401).json({ status: 0, message: "Unauthorized" })
	}

    req.user = jwtPayload.payload

	next()
}

//Does actual authentication. Is different in docker branch. Check it
const authJWT = async (req) => {
	// Use Passport
	// Return JWTPayload;

	//Checks JWT Token and returns result accordingly. The response from here is of fixed type defined by me.
	try {

		return new Promise((resolve, reject) => {
			jwt.verify(extractedJwtToken(req), extractedSecretOrKey, async function (error, decoded) {

				if (error) {
						// console.log("JWT Auth Fail");
						resolve({
							status: 0,
							message: "Invalid Token",
							payload: null
						});
				} else {
					// console.log("JWT Auth Success");
					resolve({
						status: 1,
						message: "Valid Token",
						payload: decoded
					});
				}
				
			})
		})
	} catch (e) {
		// console.log("JWT Auth Fail");
		resolve({
			status: 0,
			message: "Invalid Token",
			payload: null
		});
	}

}

exports.authenticateUserToken = authenticateUserToken