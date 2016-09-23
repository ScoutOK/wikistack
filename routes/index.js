'use strict';
var express = require('express');
var router = express.Router();




module.exports = function makeRouterWithSockets (io) {
  router.get('/', function(req, res, next) {
    //if (err) return next(err);
    console.log('in router')
    res.render('index');
  });


  return router;
}
