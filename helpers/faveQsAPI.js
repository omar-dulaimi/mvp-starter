const request = require('request');

let getQuote = function (callback) {
    const options = {
        url: `https://favqs.com/api/qotd`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        }
    };

    request(options, function (err, res, body) {
        if (err) {
            callback(err, null);
        } else {
            console.log("------------API: getting Quote!")
            callback(err, JSON.parse(body))
        }
    });
}


let getPicture = function (author, callback) {
    const options = {
        url: `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURI(author)}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        }
    };

    request(options, function (err, res, body) {
        if (err) {
            callback(err, null);
        } else {
            console.log("------------API: getting Wikipedia Picture!")
            callback(err, JSON.parse(body))
        }
    });
}

module.exports.getQuote = getQuote;
module.exports.getPicture = getPicture;
