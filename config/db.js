//Mongodb config

const mongoose = require("mongoose");

module.exports.connect = async () => {
    await mongoose
        .connect(process.env.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => console.log(err));
}
