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
  });
});


// app.post('/items', function (req, res) {
//   let quote = req.body.quote;
//   let author = req.body.author;

//   db.isQuoteExist(quote, function (err, result) {
//     if (err) {
//       console.log('^---error:POST checking for quote!');
//     } else {
//       if (!result) {
//         db.insertQuote(quote, author, function (err, result) {
//           if (err) {
//             console.log('^---error:POST:Insert in inserting quote!');
//           } else {
//             res.send(result);
//           }
//         });
//       } else {
//         res.send('Quote already exist!');
//         console.log('<---Quote already exist!--->');
//       }
//     }
//   });
// });

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

app.listen(5000, function () {
  console.log('listening on port 5000!');
});
