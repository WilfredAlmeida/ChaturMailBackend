const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db = require('./config/db')
require('dotenv').config()
const port = 4545

const admin = require('firebase-admin');
var serviceAccount = require("./config/serviceAccountKey.json");

const firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    storageBucket: "yeshomes-auth.appspot.com"
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


//Making the server
app.listen(port, async () => {
    console.log("Listening on port " + port);
    await db.connect();//Connecting to mongodb
});

