'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var router = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var model = require('./models');
var wikiRouter = require('./routes/wiki');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//server
var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});
var io = socketio.listen(server);

model.Page.sync({}).then(function() {
  return model.User.sync({});
}).then(function(){console.log('connected to databases')}).catch(console.error)



//static middleware
app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', wikiRouter);

app.use('/', router);

