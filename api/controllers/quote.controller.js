const Quote = require('../models/quote.model');
const axios = require('axios');

function getAuthorImage(wikiObj) {
    const {
        query: { pages },
    } = wikiObj;

    let authorImage = null;

    for (const key in pages) {
        if (
            pages[key].hasOwnProperty('original') &&
            pages[key].original.hasOwnProperty('source') &&
            pages[key].original.hasOwnProperty('width') &&
            pages[key].original.hasOwnProperty('height')
        ) {
            authorImage = pages[key].original.source;
        }
    }

    return [authorImage];
}

exports.generateQuote = async (req, res) => {
    try {
        const {
            quote: { body, author },
        } = await axios.get('https://favqs.com/api/qotd');

        const wikiObj = await axios.get(
            `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURI(
                author,
            )}`,
        );

        const [authorImage] = getAuthorImage(wikiObj);

        res.status(200).json({ quote: body, authorImage });
    } catch (e) {
        res.status(500).json({
            message: 'Could not generate quote!',
            error: e,
        });
    }
};

exports.addQuoteToFavs = async (req, res) => {};
