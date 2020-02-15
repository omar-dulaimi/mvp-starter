const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./api/routes/v1')();
const app = express();

const port = process.env.PORT || 5000;
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(cors({
    origin: [
        'https://quotesmachineapp.herokuapp.com',
        'http://localhost:8080'
    ],
    optionsSuccessStatus: 200,
}));
app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}!\nGo to: http://localhost:${port}`);
});
