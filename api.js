// ==== Node Modules ====
var express = require('express');
var colors = require('colors');
var mongoose = require('mongoose');
var twilio = require('twilio')
	('AC44e4193dd5a5565845962f8f0cd23657', 
	'a5660fce732c184fad44538b12e89083');


// ==== App ====
var App = global.App = require('./lib/App');
var port = App.config().port;

// ==== Express ====
var app = express();

// ==== Connect to MongoDB ====
//mongoose.connect('mongodb://localhost/fba')

// ==== Apply global middleware ====
App.MW('global-middleware').apply(app);

// ==== Initialize Routes  ====
App.Lib('router').init(app);

// ==== Listen ====
app.listen(port);
console.log('Express server listening on port ' + port.toString().blue);

app.use(express.static('public'));
console.log('Static content being served as well');

//module.exports = App;
