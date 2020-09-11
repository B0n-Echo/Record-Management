let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors= require('cors');
let bodyParser= require('body-parser');
let dataBaseConfig  = require('./database/db.js');
const studentRoute = require('./routes/student.route');
const app = express();
let createError = require('createerror');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

// Setting up static director
app.use(express.static(path.join(__dirname + 'dist/Record-Management')));


// RESTful API root
app.use('/api', studentRoute)

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
});

// Setup 404 error using express.js
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Record-Management'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
