const Quote = require('../models/quote.model');
const axios = require('axios');

getImageByHeight = (imageUrl, heighInPixels) => {
    try {
        let modifiedUrl = imageUrl;
        if (imageUrl && imageUrl.includes('commons')) {
            const lastIndex = imageUrl.indexOf('commons') + 8;
            modifiedUrl = imageUrl.slice(0, lastIndex) + 'thumb/' + imageUrl.slice(lastIndex);
            return modifiedUrl ? [`${modifiedUrl}/${heighInPixels ? heighInPixels : 300}px-${modifiedUrl.split('/')[modifiedUrl.split('/').length - 1]}`] : [modifiedUrl];
        }
        return modifiedUrl;

    } catch (error) {
        console.log("Eila: getImageByHeight -> error", error)
        return imageUrl;
    }
}

getAuthorImage = (wikiObj) => {
    try {
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

        return getImageByHeight(authorImage, 400);
    } catch (error) {
        console.log("Eila: getAuthorImage -> error", error);
        return null;
    }
}

exports.generateQuote = async (req, res) => {
    try {
        const {
            data: {
                quote: { body, author, id: favqsId },
            },
        } = await axios.get('https://favqs.com/api/qotd');

        const wikiObj = await axios.get(
            `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURI(
                author,
            )
            } `,
        );

        const [authorImage] = getAuthorImage(wikiObj && wikiObj.data ? wikiObj.data : null);

        res.status(200).json({ quote: body, authorImage, favqsId, author });
    } catch (e) {
        console.log("Eila: exports.generateQuote -> e", e)
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
            const quote = new Quote(req.body);
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

exports.getFavorites = async (req, res) => {
    try {
        const favoriteQuotes = await Quote.find({ isDeleted: { $ne: true } });
        res.status(200).json(favoriteQuotes);
    } catch (e) {
        res.status(500).json({
            message: 'Could not get favorites!',
            error: e,
        });
    }
};
