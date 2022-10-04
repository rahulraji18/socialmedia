const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config({path: 'config/config.env'});
require('./config/database');
const errorMiddleware = require('./middlewares/error');
const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(logger('dev')); //common
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(errorMiddleware);

module.exports = app;
