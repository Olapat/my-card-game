const express = require('express');
const bodyParser = require('body-parser');
// const moment = require('moment');
// require('moment/locale/th');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

// var requestTime = function (req, res, next) {
//     req.requestTime = Date.now();
//     console.log(moment(req.requestTime).format("YYYY-MM-DD HH:mm:ss"), `path: ${req.originalUrl}`);
//     next();
// }

// app.use(requestTime)

module.exports = app;