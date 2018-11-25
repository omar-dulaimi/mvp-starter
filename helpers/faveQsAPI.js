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


// https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Albert%20Einstein
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
