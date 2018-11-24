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
  item: String,
  qty: Number
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function (callback) {
  Item.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      console.log('------------DB is empty!')
      console.log('-------------items = ', items);
      callback(null, items);
    }
  });
};

var insertQuote = function (item, qty, callback) {
  Item.collection.insert({ item: item, qty: qty }, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log('------------Saved on DB!');
      callback(null, result)
    }
  });
}

var isQuoteExist = function (item, callback) {
  Item.collection.findOne({ item: item }, function (err, result) {
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