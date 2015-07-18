var router = require('express').Router();

router.get('/', function(req, res) {
  var client = require('twilio')('AC44e4193dd5a5565845962f8f0cd23657', 'a5660fce732c184fad44538b12e89083');

  //Send an SMS text message
  console.log(client);
  client.sendMessage({

      to:'+16474634380', // Any number Twilio can deliver to
      from: '+12892160973', // A number you bought from Twilio and can use for outbound communication
      body: 'word to your mother.' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
          res.send("done")
      }
      else{
        res.send(err);
        console.log(err);
      }
  });

});

module.exports = router;
