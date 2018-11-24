const request = require('request');

let getQuoteCategories = async function (callback) {
    const options = {
        url: 'http://quotes.rest/qod/categories.json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        }
    };

    request(options, function (err, res, body) {
        console.log("------------I'm inside API!")
        callback(err, JSON.parse(body));
    });
}

module.exports.getQuoteCategories = getQuoteCategories;