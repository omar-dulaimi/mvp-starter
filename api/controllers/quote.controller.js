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
            quote: { body, author, id: favqsId },
        } = await axios.get('https://favqs.com/api/qotd');

        const wikiObj = await axios.get(
            `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURI(
                author,
            )}`,
        );

        const [authorImage] = getAuthorImage(wikiObj);

        res.status(200).json({ quote: body, authorImage, favqsId });
    } catch (e) {
        res.status(500).json({
            message: 'Could not generate quote!',
            error: e,
        });
    }
};

exports.addQuoteToFavs = async (req, res) => {
    try {
        const { favqsId } = req.body;
        const foundQuote = await Quote.findOne({ favqsId });

        if (!foundQuote) {
            const quote = new Quote(body);
            await quote.save();
            res.status(200).json({
                message: 'Quote added to favorites successfully!',
            });
        } else {
            res.status(500).json({
                message: 'Quote already in favorites!',
            });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Could not add quote to favorites!',
            error: e,
        });
    }
};
