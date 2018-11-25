var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mongo');
var api = require('../helpers/faveQsAPI');

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

var port = process.env.PORT || 5000;

//Get a quote from API and send it back to the client
app.get('/items', function (req, res) {
  api.getQuote(function (err, data) {
    let quote = data.quote.body;
    let author = data.quote.author;
    api.getPicture(author, function (err, result) {
      let obj = result.query.pages;
      let imageUrl;
      for (let key in obj) {
        if (obj[key].hasOwnProperty('original') && obj[key].original.hasOwnProperty('source')) {
          imageUrl = obj[key].original.source;
          console.log('--------imgurl = ', imageUrl)
        }
      }
      imageUrl ? res.send({ quote: quote, author: author, imageUrl: imageUrl }) : res.send({ quote: quote, author: author });
    })
  });
});

//Save a quote sent from the client on the DB
app.post('/favquotes', function (req, res) {
  let quote = req.body.quote;
  let author = req.body.author;

  //Make sure this quote was not posted before
  db.isQuoteExist(quote, function (err, result) {
    if (err) {
      console.log('^---error:POST checking for quote!');
    } else {
      if (!result) {
        db.insertQuote(quote, author, function (err, result) {
          if (err) {
            console.log('^---error:POST:Insert in inserting quote!');
          } else {
            res.send('<---Quote Saved on DB!--->');
          }
        });
      } else {
        res.send('^---Quote already exist!---^');
        console.log('^---Quote already exist!---^');
      }
    }
  });
});

//Send the quotes saved on the DB back to the client
app.get('/favquotes', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      console.log('^---error:GET:selectAll:favquotes!')
      res.sendStatus(500);
    } else {
      console.log('<---Sending favquotes from DB to Client--->');
      res.send(data);
    }
  });
});

app.listen(port, function () {
  console.log('listening on port 5000!');
});
