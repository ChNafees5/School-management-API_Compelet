const mongoose = require('mongoose');
const express = require('express');
const app = express();
let port = 3000;
var mongoDB = 'mongodb://127.0.0.1/student';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { console.log('Connected to Mongo database')});
app.use(express.json())
const userRoute = require('./router/register')
const coursesRoute = require('./router/Course')
app.use('/signup', userRoute)
app.use('/courses', coursesRoute)
app.listen(3000, () => {
  console.log(`server is listening on Port: ${port}`);
})