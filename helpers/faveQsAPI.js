const request = require('request');

// let getQuoteCategories = async function (callback) {
//     const options = {
//         url: 'http://quotes.rest/qod/categories.json',
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Accept-Charset': 'utf-8',
//         }
//     };

//     request(options, function (err, res, body) {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log("------------API: getting Categories!")
//             callback(err, JSON.parse(body))
//         }
//     });
// }

// let getQuoteForACategory = function (category, callback) {
//     const options = {
//         url: `http://quotes.rest/qod.json?category=${category}`,
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Accept-Charset': 'utf-8',
//         }
//     };

//     request(options, function (err, res, body) {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log("------------API: getting Quote!")
//             callback(err, JSON.parse(body))
//         }
//     });
// }


// module.exports.getQuoteCategories = getQuoteCategories;
// module.exports.getQuoteForACategory = getQuoteForACategory;


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

module.exports.getQuote = getQuote;
