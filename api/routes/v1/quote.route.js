const express = require('express');
const router = express.Router();
const QuoteController = require('../../controllers/quote.controller');

router
    .route('/')
    .get(QuoteController.getFavorites)
    .post(QuoteController.addQuoteToFavs);

route('/generate').get(QuoteController.generateQuote);

module.exports = router;
