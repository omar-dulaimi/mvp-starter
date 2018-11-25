var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  quote: String,
  author: String,
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function (callback) {
  Item.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      if (items.length === 0) {
        console.log('------------DB is empty!')
        callback(null, 0);
      } else {
        console.log('-------------items = ' +  items);
        callback(null, items);
      }
    }
  });
};

var insertQuote = function (quote, author, callback) {
  Item.collection.insert({ quote: quote, author: author }, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log('------------Saved on DB!');
      callback(null, result)
    }
  });
}

var isQuoteExist = function (quote, callback) {
  Item.collection.findOne({ quote: quote }, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.insertQuote = insertQuote;
module.exports.isQuoteExist = isQuoteExist;