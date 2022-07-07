const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db = require('./config/db')
const redis = require("redis")
require('dotenv').config()
const port = process.env.PORT||4545
const redisPort = process.env.REDIS_PORT || 6379

const admin = require('firebase-admin');
// var serviceAccount = require("./config/serviceAccountKey.json");

const firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: Buffer.from(process.env.PRIVATE_KEY , 'base64').toString('ascii'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
      }
      )
});



const app = express()

app.locals.firebaseAdmin = firebaseAdmin

app.use(cors())
app.use(express.json())

const emailRoute = require("./routes/email")
const promptsRoute = require("./routes/prompt")
const authRoute = require("./routes/user")
const userRoute = require("./routes/user")
const tutorialsRoute = require("./routes/tutorial")
const miscRoute = require("./routes/misc")

app.use("/email", emailRoute)
app.use("/prompt", promptsRoute)
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/tutorials", tutorialsRoute)
app.use("/misc", miscRoute)

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/",(req,res)=>{
    res.end("Hello Heckerr")
})

//Making the server
app.listen(port, async () => {
    console.log("Listening on port " + port);
    console.log(process.env.REDIS_IP);
    console.log(process.env.OS_ENV);
    await db.connect();//Connecting to mongodb
});

