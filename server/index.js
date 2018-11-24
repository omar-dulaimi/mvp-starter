var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mongo');
var api = require('../helpers/theysaidsoAPI');

var app = express();
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../react-client/dist'));



app.get('/items', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('-------------From DB: ', data);
      console.log('----------data.length=', data.length)
      if(data.length === 0){
        console.log('------------data is empty!')
        api.getQuoteCategories(function(err, data){
          console.log(data)
        });
      }
      res.send(data);
    }
  });
});

app.post('/items', function (req, res) {
  console.log('----------- item = ', req.body.item);
  console.log('----------- item = ', req.body.qty);
  let item = req.body.item;
  let qty = req.body.qty;

  db.isQuoteExist(item, function (err, result) {
    if (err) {
      console.log('---------------- error checking for quote!');
    } else {
      if (!result) {
        db.insertQuote(item, qty, function (err, result) {
          if (err) {
            console.log('------------error in inserting quote!');
          } else {
            res.send(result);
            // console.log('--------Saved on DB!()');
          }
        });
      } else {
        res.send('Quote already exist!');
        console.log('-------------Quote already exist!');
      }

    }
  });
});

app.listen(5500, function () {
  console.log('listening on port 5500!');
});

