const express = require('express');
const router = express.Router();
const QuoteController = require('../../controllers/quote.controller');

router
    .route('/')
    .get(QuoteController.generateQuote)
    .post(QuoteController.addQuoteToFavs);

module.exports = router;
