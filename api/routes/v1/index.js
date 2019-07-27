const express = require('express');
const quoteRoutes = require('./quote.route.js');

const router = express.Router();

module.exports = () => {
    router.use('/quotes', quoteRoutes);
    return router;
};
