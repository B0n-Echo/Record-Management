let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors= require('cors');
let bodyParser= require('body-parser');
let dataBaseConfig  = require('./database/db.js');
const studentRoute = require('./routes/student.route');

// MongoDb Connection configuration
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log('Database connected sucessfully ')
},
error => {
  console.log('Could not connected to database : ' + error)
});

// Set up express js port

