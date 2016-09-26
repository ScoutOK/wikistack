'use strict';
var express = require('express');
var router = express.Router();
var models =require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  //if (err) return next(err);
  //res.render('index');
  Page.findAll().then(function(object){res.render('index.html', {pages: object})}).catch();
});

router.get('/users', function(req, res, next){
  User.findAll().then(function(object){res.render('users.html', {users: object})}).catch();
})

router.get('/users/:id', function(req, res, next){
  var pagePromise = Page.findAll({where:{authorId: req.params.id}});
  var userPromise = User.findById(req.params.id);

  Promise.all([userPromise, pagePromise]).then(function(values){
    var user = values[0];
    var pages = values[1];
    console.log(user);
    res.render('userPage.html', {user: user, pages: pages});
  })
  .catch(next);

})

router.get('/search', function(req, res, next){
  console.log(req.query.term)
  var term = req.query.term;
  res.redirect('/search/'+term)
})

module.exports = router
