var router = require('express').Router();
var client = require('twilio')('AC44e4193dd5a5565845962f8f0cd23657', 'a5660fce732c184fad44538b12e89083');
var twilio = require('twilio');
var feed = require("feed-read");
router.get('/', function(req, res) {
  var resp = new twilio.TwimlResponse();
  var text = '';
  // The TwiML response object will have functions on it that correspond
  // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
  // Passing in a string argument sets the content of the XML tag.
  // Passing in an object literal sets attributes on the XML tag.


 //resp.message('ahoy hoy! Testing Twilio and node.js');

 switch(req.query.Body.toLowerCase()){

   case "commands":
      resp.message("you requested help");

      res.writeHead(200, {
          'Content-Type':'text/xml'
      });

      res.end(resp.toString());

      break;
  case "pic":
      resp.message("<Media>https://demo.twilio.com/owl.png</Media>");
      res.writeHead(200, {
          'Content-Type':'text/xml'
      });

      res.end(resp.toString());
      break;
  default: test(req.query.Body, function(err, txt){
      text = txt;
      resp.message("Please wait a moment");
      resp.message(txt);
      //Render the TwiML document using "toString"
      res.writeHead(200, {
        'Content-Type':'text/xml'
      });
      res.end(resp.toString());
    });
  }
});


function test(rss, callback){
  feed(rss, function(err, articles) {
    if (err) callback(err)
    var articleTitles = ""
    for(var i = 0; i < articles.length; i++){
      articleTitles +=  i + ": " + articles[i].title + "\n";
    }
    callback(null, articleTitles);
   })
 }
  // Each article has the following properties:
  //
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  //


module.exports = router;
