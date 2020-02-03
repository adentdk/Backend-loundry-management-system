const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const router = require('./app/routes')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router(app)

module.exports = app;
