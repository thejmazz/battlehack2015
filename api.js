// ==== Node Modules ====
var express = require('express');
var colors = require('colors');
var mongoose = require('mongoose');

<<<<<<< Updated upstream
var client = require('twilio')('AC44e4193dd5a5565845962f8f0cd23657', 'a5660fce732c184fad44538b12e89083');

/*
client.messages.list(function(err, data) {
    var msg = data.messages.pop();

    client.messages(msg.sid).get(function(err, message) {
      console.log(message.body);
  });

});
/*clientSID.forEach(function(err, data){
  client.sendMessage({
      to:'+16474634380', // Any number Twilio can deliver to
      from: '+12892160973', // A number you bought from Twilio and can use for outbound communication
      body: 'replying to your message' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          // outputs "+14506667788"
          console.log(responseData.sid);
          clientSID.push(responseData.sid)// outputs "word to your mother."
      }
      else{
        console.log(err);
      }
  });

})
/*client.sendMessage({
    to:'+16474634380', // Any number Twilio can deliver to
    from: '+12892160973', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        // outputs "+14506667788"
        clientSID.push(responseData.sid)// outputs "word to your mother."
    }
    else{
      console.log(err);
    }
});*/

=======
>>>>>>> Stashed changes
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