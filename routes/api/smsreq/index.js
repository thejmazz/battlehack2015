var router = require('express').Router();
var client = require('twilio')('AC44e4193dd5a5565845962f8f0cd23657', 'a5660fce732c184fad44538b12e89083');
var twilio = require('twilio');
var feed = require("feed-read");
var request = require("request");
var read = require('node-readability');
var cheerio = require('cheerio');
var baseUrl = 'http://45.55.193.224/';

var SMSModel = App.Model("sms");

var phone_num = "+12892160973"; //"+16475600682"



router.get('/', function(req, res) {
  var resp = new twilio.TwimlResponse();
  var text = '';

  var smsModel = new SMSModel({SMS: req.query.From});

  // The TwiML response object will have functions on it that correspond
  // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
  // Passing in a string argument sets the content of the XML tag.
  // Passing in an object literal sets attributes on the XML tag.

  var input = req.query.Body.toLowerCase().split(" ");
  var findrss = require("find-rss");

  if (!isNaN(parseInt(input[0]))) {
    resp.message("Please wait a moment....");
    //close(res, resp);
    SMSModel.findOne({SMS: req.query.From}, function(err, model){
        if(err)
          return console.log(err);
        articulate(model.GeneralList[parseInt(input[0])], function(err, par){
          console.log(par);
          resp.message(par);
          close(res, resp);
        });

      });


  } else {
    switch(input[0]){

      case "commands":
      resp.message("you requested help");
      close(res, resp);
      break;

      case "site":
      resp.message("Please wait a moment...");
      request(baseUrl + "api/screen/?url=" + input[1], function (error, response, body) {
        client.messages.create({
          to: req.query.From,
          from: phone_num,
          mediaUrl: baseUrl + body
        }, function(err, message) {
          if(err) return console.log(err);
          process.stdout.write(message.sid);
          close(res, resp);
        });
      });
      break;

      case "rss":
      resp.message("Please wait a moment...");
      parseRSS(input[1], smsModel, function(err, txt){
        if(err)
        return console.log(err);
        resp.message(txt);
        close(res, resp);
      });
      break;

      case "read":
      resp.message("Please wait a moment...");

      findrss(input[1], function (err, response, body) {
        if (err) return console.log(err);

        if (response.length === 1) {
          console.log("here");
          parseRSS(response[0].url, smsModel, function(err, txt) {
            resp.message(txt);
            close(res, resp);
          })

        } else {
          console.log("here2");
          //list of rsses
          var rsslist = []
          for (var i = 0; i < response.length; i++) {
            rsslist.push(i + ": " + response[i].title + "\n");
          }
          resp.message(rsslist.join());
          close(res, resp);
        }
      });
      break;

      default:
        resp.message("invalid command");
        close(res, resp);

    }
  }
});

function parseRSS(xml, schema, callback) {
  feed(xml, function(err, articles) {
    if (err)
      return callback(null, "no feed found!");
    var articleTitles = ""
    var list = []
    for(var i = 0; i < articles.length; i++){
      articleTitles +=  i + ": " + articles[i].title + "\n";
      list.push(articles[i].link);
    }
    console.log(articleTitles);
    SMSModel.findOne({SMS: schema.SMS}, function(err, model){
      if(err)
        return console.log(err);
      else if(model){
        model.GeneralList = list;
      }else{
        model = schema;
        model.GeneralList = list;
      }
      model.save(function(err, data){
        if(err)
          return console.log(err);
        callback(null, articleTitles);
      })
    })
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


function articulate(page, callback) {

  request(page, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request
        if(error)
          return console.error(err);

        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);
          //var data = $(this);
          var paragraphs = ""

          var p = $('p');
          for ( var i=0; i<p.length; i++) {
            for(var j = 0; j < p[i].children.length; j++){
              console.log(p[i].children[j]);
              if(p[i].children[j].data){
              paragraphs += (p.children[j].data);
            }
          }
        }
        callback(null, paragraphs);

    });
}



module.exports = router;
