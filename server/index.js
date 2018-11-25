var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mongo');
var api = require('../helpers/faveQsAPI');

var app = express();
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../react-client/dist'));



app.get('/items', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      api.getQuote(function (err, data) {
        let quote = data.quote.body;
        let author = data.quote.author;
        console.log('-------------quote = ', quote)
        console.log('-------------author = ', author)
        db.isQuoteExist(quote, function (err, result) {
          if (err) {
            console.log('^---Error in checking for quote:get');
          } else {
            // if (!result) {
            //   db.insertQuote(quote, author, function (err, result) {
            //     if (err) {
            //       console.log('^---error in inserting quote!');
            //     } else {
            //       res.send({quote: result.ops[0].quote, author: result.ops[0],author});
            //     }
            //   });
            // } else {
            //   res.send('Quote already exist!');
            //   console.log('-------------Quote already exist!');
            // }
            res.send({ quote: quote, author: author });
            // res.sendStatus(200);
          }
        });
        // console.log(`Quote: ${data.quote.body}
        // Author: ${data.quote.author}`);
      });
      // res.send(data);
    }
  });
});

app.post('/items', function (req, res) {
  console.log('----------- quote = ', req.body.quote);
  console.log('----------- author = ', req.body.author);
  let quote = req.body.quote;
  let author = req.body.author;

  db.isQuoteExist(quote, function (err, result) {
    if (err) {
      console.log('^---error:POST checking for quote!');
    } else {
      if (!result) {
        db.insertQuote(quote, author, function (err, result) {
          if (err) {
            console.log('^---error:POST:Insert in inserting quote!');
          } else {
            res.send(result);
            // console.log('--------Saved on DB!()');
          }
        });
      } else {
        res.send('Quote already exist!');
        console.log('<---Quote already exist!--->');
      }

    }
  });
});

app.post('/favquotes', function (req, res) {
  console.log('----------- quote = ', req.body.quote);
  console.log('----------- author = ', req.body.author);
  let quote = req.body.quote;
  let author = req.body.author;


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
            // res.send(result);
          }
        });
      } else {
        res.send('^---Quote already exist!---^');
        console.log('^---Quote already exist!---^');
      }
    }
  });

});


app.get('/favquotes', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      db.selectAll(function(err, data){
        if(err){
          console.log('^---error:GET:selectAll:favquotes!')
        } else {
          console.log('<---Sending favquotes from DB to Client--->');
          res.send(data);
        }
      });
    }
  });
});

app.listen(5000, function () {
  console.log('listening on port 5000!');
});
