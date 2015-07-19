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

  var input = req.query.Body.toLowerCase().split(" ");
  var findrss = require("find-rss");
  console.log(input);

  switch(input[0]){
    case "commands":
      resp.message("you requested help");
      close(res, resp);
      break;

    case "pic":
      client.messages.create({
        to: req.query.From,
        from: "+12892160973",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Toronto_Maple_Leafs_logo.svg/178px-Toronto_Maple_Leafs_logo.svg.png"
      }, function(err, message) {
        console.log(err);
        process.stdout.write(message.sid);
        close(res, resp);
      });
      break;

    case "rss":
      resp.message("Please wait a moment...");
      parseRSS(input[1], function(err, txt){
        resp.message(txt);
        //Render the TwiML document using "toString"
        close(res, resp);
      });

    case "read":
      resp.message("Please wait a moment...");

      findrss(input[1], function (err, response, body) {
        if (err) return console.log(err);

        if (response.length === 1) {
          parseRSS(response[0].url, function(err, txt) {
            resp.message(txt);
            close(res, resp);
          })

        } else {

          var rsslist = []
          for (var i = 0; i < response.length; i++) {
            rsslist.push(i + ": " + response[i].title + "\n");
          }
          resp.message(rsslist.join());
        }

        console.log(response);
      });

    default:
      //type

  }
});


function parseRSS(xml, callback) {
  // var type = feed.identify(xml);
  feed(xml, function(err, articles) {
      if (err)
        return callback(null, "no feed found!");
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

//utilities

function close(res, resp){
  res.writeHead(200, {
      'Content-Type':'text/xml'
  });

  res.end(resp.toString());

}
module.exports = router;
