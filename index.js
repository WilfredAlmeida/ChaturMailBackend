const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db = require('./config/db')
require('dotenv').config()
const port = 4545

const admin = require('firebase-admin');
// var serviceAccount = require("./config/serviceAccountKey.json");

const firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
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

app.use("/email", emailRoute)
app.use("/prompt", promptsRoute)
app.use("/auth", authRoute)

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

//Making the server
app.listen(port, async () => {
    console.log("Listening on port " + port);
    await db.connect();//Connecting to mongodb
});

