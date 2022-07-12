const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
const {redisDb} = require("../config/db");
const { setRedisAsync, setRedisAsyncEx, getRedisAsync } = require("../config/redisConfig");

const opts = {};
const extractedJwtToken = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = extractedJwtToken;

const extractedSecretOrKey = process.env.JWT_KEY;
opts.secretOrKey = extractedSecretOrKey;

//Read this file from master branch first

/*
Flow here is:

1. Verify JWT
2. Check for user in cache, if found next(), else move ahead
3. Check for user in MongoDB, if found save in cache and next(), else return unathorized

*/
async function authenticateUserToken(req, res, next) {

	//Jwt check
	var jwtPayload = await authJWT(req);

	if (jwtPayload.status == 0) {
		return res.status(401).json({ status: 0, message: "Unauthorized" })
	}

    req.user = jwtPayload.payload

	//Cache check
	const cachedUserUid = await getRedisAsync(req.user.email)
	if(cachedUserUid!=null) {
		console.log("hit");
		next()
		return
	}

	//MongoDB Check
	var usr = await UserModel.findOne({email:req.user.email})
	if(usr==null){
		return res.status(401).json({ status: 0, message: "Unauthorized" })
	}

	await setRedisAsyncEx(req.user.email,3600,req.user.uid)
	console.log("miss");

	next()
}

const authJWT = async (req) => {
	// Use Passport
	// Return JWTPayload;

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