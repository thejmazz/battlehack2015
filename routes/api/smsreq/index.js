var router = require('express').Router();
var client = require('twilio')('AC44e4193dd5a5565845962f8f0cd23657', 'a5660fce732c184fad44538b12e89083');
var twilio = require('twilio')
router.get('/', function(req, res) {
  var resp = new twilio.TwimlResponse();

 // The TwiML response object will have functions on it that correspond
 // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
 // Passing in a string argument sets the content of the XML tag.
 // Passing in an object literal sets attributes on the XML tag.

 //resp.message('ahoy hoy! Testing Twilio and node.js');
 switch(req.query.Body.toLowerCase()){
   case "commands": resp.message("you requested help");
      break;
   default: test(resp, req.query.Body);
 }
 //Render the TwiML document using "toString"
 res.writeHead(200, {
     'Content-Type':'text/xml'
 });
 res.end(resp.toString());

});
router.get('/messages', function(req, res){

})

module.exports = router;
