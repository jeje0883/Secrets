 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');

 require('dotenv').config({path: "../.env"});
 const mongoodb = process.env.MONGODB_STRING;
 const port = process.env.PORT || 5000;

 //connect to the MongoDB server
 mongoose.connect(mongoodb);
 mongoose.connection.on('connected', () => console.log('Now connected to MongoDB Atlas'));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//set up cors middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions));

const userRoute = require("./routers/userRoute");
const homeRoute = require("./routers/homeRoute");
// const secretRoutes = require("./routers/secretRoutes");

app.use('/users', userRoute);
// app.use('secrets', secretRoutes);

app.use("/", homeRoute);

if (require.main === module) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = {app, mongoose};