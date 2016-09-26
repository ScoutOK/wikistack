'use strict';
var express = require('express');
var router = express.Router();
var models =require('../models');
var randomString = require('randomstring');

var Page = models.Page;
var User = models.User;


router.get('/',function(req, res, next){
  res.redirect('/')
});

router.post('/', function(req, res, next){

  var user = User.build({
    name: req.body.name,
    email: req.body.email
  })

  User.findOrCreate({where: {name: user.name, email: user.email}}).spread(function(user, wasCreated){

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags.split(" "),
      authorId: user.id
    });


    page.save().then(function(page){
      res.redirect(page.route)}).catch(console.error);

  });

  // res.json(req.body);
});

router.get('/add', function(req, res, next){
  res.render('addpage')
});

router.get('/:pageurl', function (req,res, next) {
  Page.findOne({where: {urlTitle: req.params.pageurl},
    include: [{model: User, as: 'author'}]}).then(function(object){
      console.log(object);
      res.render('wikipage', {page: object, tags: object.tags.join(" ")})}).catch();


  // User.findOne({where: {id: authorId}})
  //res.render('wikipage', object);
  //res.send('check the console');

})





module.exports = router
