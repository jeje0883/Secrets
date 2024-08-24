 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const passport = require("passport");
 const session = require("express-session");
 require("./auth/passport");

 require('dotenv').config({path: "../.env"});
 const mongoodb = process.env.MONGODB_STRING;
 const port = process.env.PORT || 3000;

 //connect to the MongoDB server
 mongoose.connect(mongoodb);
 mongoose.connection.on('connected', () => console.log('Now connected to MongoDB Atlas'));



//set up cors middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.clientSecret,
    resave: false,
    saveUninitialize: false
  }));
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require("./routers/userRoute");
const homeRoute = require("./routers/homeRoute");
const postRoute = require("./routers/postRoute");
const adminRoute = require("./routers/adminRoute");

app.use('/users', userRoute);
app.use("/", homeRoute);
app.use("/posts", postRoute);
app.use("/admin", adminRoute);


if (require.main === module) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = {app, mongoose};