const express = require('express');
const Student = require('../model/Student');
const studentRoute = express.Router();

const app = express();
let Student = require('../model/Student');

studentRoute.route('./add-student').post((req, res, next) => {
  Student.create(req.body, (error, student) => {
    if(error){
      return next(error);
    } else {
      res.json(student);
    }
  })
});

studentRoute.route('/').get((req, res, next) => {
  Student.find((error, data) => {
    if(error){
      return next(error);

    } else {
      res.json(data);

    }
  })
});

studentRoute.route('/read-student/:id').get((req, res, next) => {
  Student.findById(req.params.id,  (error, student) => {
    if(error){
      return next(error);
    } else {
      res.json(student);
    }
  })
});
