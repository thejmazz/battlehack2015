// ==== Node Modules ====
var express = require('express');
var colors = require('colors');
var mongoose = require('mongoose');

// ==== App ====
var App = global.App = require('./lib/App');
var port = App.config().port;

// ==== Express ====
var app = express();

// ==== Connect to MongoDB ====
mongoose.connect("mongodb://albert:ass@ds041432.mongolab.com:41432/heroku_app37313258");

// ==== Apply global middleware ====
App.MW('global-middleware').apply(app);

// ==== Initialize Routes  ====
App.Lib('router').init(app);

// ==== Listen ====
app.listen(port);
console.log('Express server listening on port ' + port.toString().blue);

app.use(express.static(__dirname + '/public/src'));
app.use('/bower_components',  express.static(__dirname + '/public/bower_components'));
console.log('Static content being served as well');

//module.exports = App;
