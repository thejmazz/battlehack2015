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
function test(resp, rss){
  var FeedParser = require('feedparser')
  , request = require('request');

var req = request(rss)
  , feedparser = new FeedParser([]);

req.on('error', function (error) {
  // handle any request errors
  console.log(error);
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  console.log(error);
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {
    console.log(item);
  }
});

}
module.exports = router;
